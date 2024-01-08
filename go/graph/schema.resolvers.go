package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.41

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"quickscopedev/auth"
	"quickscopedev/database"
	"quickscopedev/graph/model"
	"quickscopedev/webhooks"
	"time"

	"github.com/tabbed/pqtype"
	"go.uber.org/zap"
)

// AccountName is the resolver for the accountName field.
func (r *integrationResolver) AccountName(ctx context.Context, obj *database.Integration) (string, error) {
	if obj.IntegrationName == database.IntegrationTypeGITHUB {
		accountInfo := &webhooks.GithubAccountInfo{}
		json.Unmarshal(obj.IntegrationData.RawMessage, &accountInfo)
		return accountInfo.AccountName, nil
	}

	if obj.IntegrationName == database.IntegrationTypeVERCEL {
		tokenInfo := &model.VercelToken{}
		json.Unmarshal(obj.IntegrationData.RawMessage, &tokenInfo)
		return tokenInfo.AccountName, nil
	}

	return "", nil
}

// GithubInstallationID is the resolver for the GithubInstallationId field.
func (r *integrationResolver) GithubInstallationID(ctx context.Context, obj *database.Integration) (int64, error) {
	if obj.GithubInstallationID.Valid == false {
		return -1, nil
	}
	return obj.GithubInstallationID.Int64, nil
}

// VercelInstallationID is the resolver for the vercelInstallationId field.
func (r *integrationResolver) VercelInstallationID(ctx context.Context, obj *database.Integration) (string, error) {
	if obj.VercelInstallationID.Valid == false {
		return "", nil
	}
	return obj.VercelInstallationID.String, nil
}

// CreateMonitor is the resolver for the createMonitor field.
func (r *mutationResolver) CreateMonitor(ctx context.Context, input model.NewMonitor) (database.Monitor, error) {
	panic(fmt.Errorf("not implemented: CreateMonitor - createMonitor"))
}

// AddIntegration is the resolver for the addIntegration field.
func (r *mutationResolver) AddIntegration(ctx context.Context, input model.NewIntegration) (database.Integration, error) {
	panic(fmt.Errorf("not implemented: AddIntegration - addIntegration"))
}

// AddGithubInstallationID is the resolver for the addGithubInstallationId field.
func (r *mutationResolver) AddGithubInstallationID(ctx context.Context, teamSlug string, installationID int64) (database.Integration, error) {
	team, _ := r.Database.GetTeamByTeamSlug(ctx, teamSlug)

	// Sometimes the webhook event may have not been fully processed before we try to access the installation id.
	// So in case of query failure, we can sleep for sometime and try again.
	retries := 5
	for retries >= 0 {
		integration, err := r.Database.UpdateIntegrationTeamIdByGitHubInstallationId(ctx, database.UpdateIntegrationTeamIdByGitHubInstallationIdParams{
			TeamID:               sql.NullInt64{Valid: true, Int64: team.ID},
			GithubInstallationID: sql.NullInt64{Valid: true, Int64: installationID},
		})

		if err == nil {
			return integration, nil
		}

		if err != nil {
			time.Sleep(time.Second * 2)
			retries -= 1
			r.Logger.Error("Could not link GitHub Account", zap.Error(err), zap.Int64("installation_id", installationID))
		}
	}

	return database.Integration{}, fmt.Errorf("Could not successfully link GitHub account. Please try again.")
}

// AddVercelIntegration is the resolver for the addVercelIntegration field.
func (r *mutationResolver) AddVercelIntegration(ctx context.Context, teamSlug string, vercelToken model.VercelToken) (database.Integration, error) {
	team, _ := r.Database.GetTeamByTeamSlug(ctx, teamSlug)
	tokenInfo, _ := json.Marshal(vercelToken)

	integration, err := r.Database.AddIntegration(ctx, database.AddIntegrationParams{
		TeamID:               sql.NullInt64{Valid: true, Int64: team.ID},
		IntegrationName:      database.IntegrationTypeVERCEL,
		IntegrationData:      pqtype.NullRawMessage{Valid: true, RawMessage: tokenInfo},
		VercelInstallationID: sql.NullString{Valid: true, String: vercelToken.InstallationID},
	})

	return integration, err
}

// Teams is the resolver for the teams field.
func (r *queryResolver) Teams(ctx context.Context, teamSlug *string) ([]database.Team, error) {
	email, _ := auth.EmailFromContext(ctx)
	user, _ := r.Database.GetUserByEmail(ctx, email)

	if teamSlug != nil {
		team, err := r.Database.GetTeamByTeamSlug(ctx, *teamSlug)
		r.Database.UpdateUserLastAccessedTeam(ctx, database.UpdateUserLastAccessedTeamParams{
			UserID:             user.ID,
			LastAccessedTeamID: team.ID,
		})
		return []database.Team{team}, err
	}

	return r.Database.GetTeamsByUserId(ctx, user.ID)
}

// TeamType is the resolver for the teamType field.
func (r *teamResolver) TeamType(ctx context.Context, obj *database.Team) (string, error) {
	return string(obj.TeamType), nil
}

// Monitors is the resolver for the monitors field.
func (r *teamResolver) Monitors(ctx context.Context, obj *database.Team, monitorSlug *string) ([]database.Monitor, error) {
	if monitorSlug != nil {
		monitor, err := r.Database.GetMonitorByTeamIdAndMonitorSlug(ctx,
			database.GetMonitorByTeamIdAndMonitorSlugParams{
				TeamID:      obj.ID,
				MonitorSlug: *monitorSlug,
			},
		)
		return []database.Monitor{monitor}, err
	}

	return r.Database.GetMonitorsByTeamId(ctx, obj.ID)
}

// Integrations is the resolver for the integrations field.
func (r *teamResolver) Integrations(ctx context.Context, obj *database.Team, integrationID *int64, integrationName *database.IntegrationType) ([]database.Integration, error) {
	if integrationID != nil && integrationName != nil {
		integration, _ := r.Database.GetIntegrationByTeamIdIntegrationIdIntegrationName(ctx, database.GetIntegrationByTeamIdIntegrationIdIntegrationNameParams{
			ID:              *integrationID,
			TeamID:          sql.NullInt64{Valid: true, Int64: obj.ID},
			IntegrationName: *integrationName,
		})
		return []database.Integration{integration}, nil
	}

	if integrationID != nil {
		integration, _ := r.Database.GetIntegrationByTeamIdIntegrationId(ctx, database.GetIntegrationByTeamIdIntegrationIdParams{
			ID:     *integrationID,
			TeamID: sql.NullInt64{Valid: true, Int64: obj.ID},
		})
		return []database.Integration{integration}, nil
	}

	if integrationName != nil {
		integrations, _ := r.Database.GetIntegrationsByTeamIdIntegrationName(ctx, database.GetIntegrationsByTeamIdIntegrationNameParams{
			IntegrationName: *integrationName,
			TeamID:          sql.NullInt64{Valid: true, Int64: obj.ID},
		})
		return integrations, nil
	}

	return r.Database.GetIntegrationsByTeamId(ctx, sql.NullInt64{Valid: true, Int64: obj.ID})
}

// Integration returns IntegrationResolver implementation.
func (r *Resolver) Integration() IntegrationResolver { return &integrationResolver{r} }

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Team returns TeamResolver implementation.
func (r *Resolver) Team() TeamResolver { return &teamResolver{r} }

type integrationResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type teamResolver struct{ *Resolver }
