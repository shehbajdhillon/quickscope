package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.41

import (
	"context"
	"fmt"
	"quickscopedev/auth"
	"quickscopedev/database"
	"quickscopedev/graph/model"
)

// CreateMonitor is the resolver for the createMonitor field.
func (r *mutationResolver) CreateMonitor(ctx context.Context, input model.NewMonitor) (database.Monitor, error) {
	panic(fmt.Errorf("not implemented: CreateMonitor - createMonitor"))
}

// Teams is the resolver for the teams field.
func (r *queryResolver) Teams(ctx context.Context, teamSlug *string) ([]database.Team, error) {
	if teamSlug != nil {
		team, err := r.Database.GetTeamByTeamSlug(ctx, *teamSlug)
		return []database.Team{team}, err
	}

	email, _ := auth.EmailFromContext(ctx)
	user, _ := r.Database.GetUserByEmail(ctx, email)
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

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Team returns TeamResolver implementation.
func (r *Resolver) Team() TeamResolver { return &teamResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type teamResolver struct{ *Resolver }
