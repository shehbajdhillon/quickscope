package graph

import (
	"context"
	"fmt"
	"quickscopedev/auth"
	"quickscopedev/database"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/google/uuid"
	"go.uber.org/zap"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

type GraphConnectProps struct {
	Logger  *zap.Logger
	Queries *database.Queries
}

func Connnect(args GraphConnectProps) *handler.Server {

	logger := args.Logger

	gqlConfig := Config{Resolvers: &Resolver{Database: args.Queries, Logger: args.Logger}}

	gqlConfig.Directives.LoggedIn = func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
		if isLoggedIn(ctx) == false {
			return nil, fmt.Errorf("Access Denied")
		}
		return next(ctx)
	}

	gqlConfig.Directives.MemberTeam = func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
		teamSlugField := obj.(map[string]interface{})["teamSlug"]
		if teamSlugField == nil {
			return nil, fmt.Errorf("Access Denied")
		}
		teamSlug := teamSlugField.(string)
		if memberTeam(ctx, teamSlug, args.Queries) == false {
			return nil, fmt.Errorf("Access Denied")
		}
		return next(ctx)
	}

	var MB int64 = 1 << 20

	gqlServer := handler.New(NewExecutableSchema(gqlConfig))
	gqlServer.AddTransport(transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
	})
	gqlServer.AddTransport(transport.Options{})
	gqlServer.AddTransport(transport.GET{})
	gqlServer.AddTransport(transport.POST{})
	gqlServer.AddTransport(transport.MultipartForm{MaxUploadSize: 1024 * MB, MaxMemory: 1024 * MB})

	gqlServer.SetQueryCache(lru.New(1000))

	gqlServer.Use(extension.Introspection{})
	gqlServer.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	gqlServer.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		user := auth.FromContext(ctx)
		oc := graphql.GetOperationContext(ctx)
		if user == nil {
			logger.Info("Incoming Request", zap.String("operation_name", oc.OperationName), zap.String("user", "nil"))
		} else {

			emailAddr, _ := auth.EmailFromContext(ctx)
			fullName, _ := auth.FullnameFromContext(ctx)
			user, err := args.Queries.GetUserByEmail(ctx, emailAddr)

			if err != nil {
				userPtr, err := setupNewUser(ctx, setupNewUserProps{
					emailAddr: emailAddr,
					fullName:  fullName,
					logger:    args.Logger,
					queries:   args.Queries,
				})
				if err == nil {
					user = *userPtr
				}
			}

			logger.Info("Incoming Request", zap.String("operation_name", oc.OperationName), zap.String("user", user.Email))
		}
		return next(ctx)
	})

	return gqlServer

}

func memberTeam(ctx context.Context, teamSlug string, queries *database.Queries) bool {
	if !isLoggedIn(ctx) {
		return false
	}

	if isSuperAdmin(ctx) {
		return true
	}

	userEmail, _ := auth.EmailFromContext(ctx)
	user, _ := queries.GetUserByEmail(ctx, userEmail)

	var team database.Team
	team, _ = queries.GetTeamByTeamSlug(ctx, teamSlug)

	_, err := queries.GetTeamMembershipByTeamIdUserId(ctx, database.GetTeamMembershipByTeamIdUserIdParams{
		UserID: user.ID,
		TeamID: team.ID,
	})

	return err == nil
}

func isLoggedIn(ctx context.Context) bool {
	user := auth.FromContext(ctx)
	return user != nil
}

func isSuperAdmin(ctx context.Context) bool {
	userEmail, _ := auth.EmailFromContext(ctx)

	if strings.Split(userEmail, "@")[1] == "quickscope.dev" {
		return true
	}

	if userEmail == "shehbaj.dhillon@gmail.com" {
		return true
	}

	return false
}

type setupNewUserProps struct {
	queries   *database.Queries
	emailAddr string
	fullName  string
	logger    *zap.Logger
}

func setupNewUser(ctx context.Context, args setupNewUserProps) (*database.UserInfo, error) {

	fullName := cases.Title(language.Und).String(strings.ToLower(args.fullName))
	firstName := strings.ToLower(strings.Split(args.fullName, " ")[0])

	user, err := args.queries.AddUser(ctx, database.AddUserParams{
		Email:    args.emailAddr,
		FullName: fullName,
	})

	if err != nil {
		args.logger.Error(
			"Could not setup new user",
			zap.Error(err),
			zap.String("user_email", args.emailAddr),
			zap.String("user_name", args.fullName),
		)
		return nil, fmt.Errorf("Could not setup new user")
	}

	var teamSlug string
	var error error = nil
	retries := 5

	for error == nil && retries >= 0 {
		retries -= 1
		shortUuid := uuid.NewString()[:8]
		teamSlug = fmt.Sprintf("%s-%s", firstName, shortUuid)
		_, error = args.queries.GetTeamByTeamSlug(ctx, teamSlug)
	}

	if retries < 0 {
		teamSlug = uuid.NewString()
	}

	team, err := args.queries.CreateNewTeam(ctx, database.CreateNewTeamParams{
		TeamSlug: teamSlug,
		TeamName: fmt.Sprintf("%s's Personal Workspace", fullName),
		TeamType: database.TeamTypePERSONAL,
	})

	if err != nil {
		args.logger.Error(
			"Could not create new personal team for user",
			zap.Error(err),
			zap.String("user_email", args.emailAddr),
			zap.String("user_name", args.fullName),
		)
		return nil, fmt.Errorf("Could not create new personal team for user")
	}

	_, err = args.queries.AddTeamMembership(ctx, database.AddTeamMembershipParams{
		TeamID:         team.ID,
		UserID:         user.ID,
		MembershipType: database.MembershipTypeOWNER,
	})

	return &user, err
}
