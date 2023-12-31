package graph

import (
	"context"
	"quickscopedev/auth"
	"quickscopedev/database"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"go.uber.org/zap"
)

type GraphConnectProps struct {
	Logger  *zap.Logger
	Queries *database.Queries
}

func Connnect(args GraphConnectProps) *handler.Server {

	logger := args.Logger

	gqlConfig := Config{Resolvers: &Resolver{Database: args.Queries}}

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
				userPtr, err := setupNewUser(ctx, setupNewUserProps{emailAddr: emailAddr, fullName: fullName})
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

type setupNewUserProps struct {
	queries   *database.Queries
	emailAddr string
	fullName  string
}

func setupNewUser(ctx context.Context, args setupNewUserProps) (*database.Userinfo, error) {
	user, err := args.queries.AddUser(
		ctx, database.AddUserParams{Email: args.emailAddr, FullName: strings.Title(strings.ToLower(args.fullName))})
	return &user, err
}
