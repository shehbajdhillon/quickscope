// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: query.sql

package database

import (
	"context"
	"database/sql"

	"github.com/tabbed/pqtype"
)

const addIntegration = `-- name: AddIntegration :one
INSERT INTO integration
(team_id, integration_name, integration_data, github_installation_id, vercel_installation_id)
VALUES ($1, $2, $3, $4, $5) RETURNING id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id
`

type AddIntegrationParams struct {
	TeamID               sql.NullInt64
	IntegrationName      IntegrationType
	IntegrationData      pqtype.NullRawMessage
	GithubInstallationID sql.NullInt64
	VercelInstallationID sql.NullString
}

func (q *Queries) AddIntegration(ctx context.Context, arg AddIntegrationParams) (Integration, error) {
	row := q.db.QueryRowContext(ctx, addIntegration,
		arg.TeamID,
		arg.IntegrationName,
		arg.IntegrationData,
		arg.GithubInstallationID,
		arg.VercelInstallationID,
	)
	var i Integration
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.IntegrationName,
		&i.IntegrationData,
		&i.GithubInstallationID,
		&i.VercelInstallationID,
	)
	return i, err
}

const addTeamMembership = `-- name: AddTeamMembership :one
INSERT INTO team_membership (team_id, user_id, membership_type)
VALUES ($1, $2, $3) RETURNING id, team_id, user_id, membership_type, created
`

type AddTeamMembershipParams struct {
	TeamID         int64
	UserID         int64
	MembershipType MembershipType
}

func (q *Queries) AddTeamMembership(ctx context.Context, arg AddTeamMembershipParams) (TeamMembership, error) {
	row := q.db.QueryRowContext(ctx, addTeamMembership, arg.TeamID, arg.UserID, arg.MembershipType)
	var i TeamMembership
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.UserID,
		&i.MembershipType,
		&i.Created,
	)
	return i, err
}

const addUser = `-- name: AddUser :one
INSERT INTO user_info (email, full_name) VALUES ($1, $2) RETURNING id, email, full_name, created
`

type AddUserParams struct {
	Email    string
	FullName string
}

func (q *Queries) AddUser(ctx context.Context, arg AddUserParams) (UserInfo, error) {
	row := q.db.QueryRowContext(ctx, addUser, arg.Email, arg.FullName)
	var i UserInfo
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.FullName,
		&i.Created,
	)
	return i, err
}

const addUserPreference = `-- name: AddUserPreference :one
INSERT INTO user_preference (user_id, last_accessed_team_id)
VALUES ($1, $2) RETURNING id, user_id, last_accessed_team_id, created
`

type AddUserPreferenceParams struct {
	UserID             int64
	LastAccessedTeamID int64
}

func (q *Queries) AddUserPreference(ctx context.Context, arg AddUserPreferenceParams) (UserPreference, error) {
	row := q.db.QueryRowContext(ctx, addUserPreference, arg.UserID, arg.LastAccessedTeamID)
	var i UserPreference
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.LastAccessedTeamID,
		&i.Created,
	)
	return i, err
}

const createNewTeam = `-- name: CreateNewTeam :one
INSERT INTO team (team_slug, team_name, team_type) VALUES ($1, $2, $3) RETURNING id, team_slug, team_name, stripe_customer_id, team_type, created
`

type CreateNewTeamParams struct {
	TeamSlug string
	TeamName string
	TeamType TeamType
}

func (q *Queries) CreateNewTeam(ctx context.Context, arg CreateNewTeamParams) (Team, error) {
	row := q.db.QueryRowContext(ctx, createNewTeam, arg.TeamSlug, arg.TeamName, arg.TeamType)
	var i Team
	err := row.Scan(
		&i.ID,
		&i.TeamSlug,
		&i.TeamName,
		&i.StripeCustomerID,
		&i.TeamType,
		&i.Created,
	)
	return i, err
}

const deleteIntegrationByGitHubInstallationId = `-- name: DeleteIntegrationByGitHubInstallationId :one
DELETE FROM integration WHERE github_installation_id = $1 RETURNING id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id
`

func (q *Queries) DeleteIntegrationByGitHubInstallationId(ctx context.Context, githubInstallationID sql.NullInt64) (Integration, error) {
	row := q.db.QueryRowContext(ctx, deleteIntegrationByGitHubInstallationId, githubInstallationID)
	var i Integration
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.IntegrationName,
		&i.IntegrationData,
		&i.GithubInstallationID,
		&i.VercelInstallationID,
	)
	return i, err
}

const getIntegrationByTeamIdIntegrationId = `-- name: GetIntegrationByTeamIdIntegrationId :one
SELECT id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id FROM integration WHERE team_id = $1 AND id = $2
`

type GetIntegrationByTeamIdIntegrationIdParams struct {
	TeamID sql.NullInt64
	ID     int64
}

func (q *Queries) GetIntegrationByTeamIdIntegrationId(ctx context.Context, arg GetIntegrationByTeamIdIntegrationIdParams) (Integration, error) {
	row := q.db.QueryRowContext(ctx, getIntegrationByTeamIdIntegrationId, arg.TeamID, arg.ID)
	var i Integration
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.IntegrationName,
		&i.IntegrationData,
		&i.GithubInstallationID,
		&i.VercelInstallationID,
	)
	return i, err
}

const getIntegrationByTeamIdIntegrationIdIntegrationName = `-- name: GetIntegrationByTeamIdIntegrationIdIntegrationName :one
SELECT id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id FROM integration WHERE team_id = $1 AND id = $2 AND integration_name = $3
`

type GetIntegrationByTeamIdIntegrationIdIntegrationNameParams struct {
	TeamID          sql.NullInt64
	ID              int64
	IntegrationName IntegrationType
}

func (q *Queries) GetIntegrationByTeamIdIntegrationIdIntegrationName(ctx context.Context, arg GetIntegrationByTeamIdIntegrationIdIntegrationNameParams) (Integration, error) {
	row := q.db.QueryRowContext(ctx, getIntegrationByTeamIdIntegrationIdIntegrationName, arg.TeamID, arg.ID, arg.IntegrationName)
	var i Integration
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.IntegrationName,
		&i.IntegrationData,
		&i.GithubInstallationID,
		&i.VercelInstallationID,
	)
	return i, err
}

const getIntegrationsByTeamId = `-- name: GetIntegrationsByTeamId :many
SELECT id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id FROM integration WHERE team_id = $1
`

func (q *Queries) GetIntegrationsByTeamId(ctx context.Context, teamID sql.NullInt64) ([]Integration, error) {
	rows, err := q.db.QueryContext(ctx, getIntegrationsByTeamId, teamID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Integration
	for rows.Next() {
		var i Integration
		if err := rows.Scan(
			&i.ID,
			&i.TeamID,
			&i.IntegrationName,
			&i.IntegrationData,
			&i.GithubInstallationID,
			&i.VercelInstallationID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getIntegrationsByTeamIdIntegrationName = `-- name: GetIntegrationsByTeamIdIntegrationName :many
SELECT id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id FROM integration WHERE team_id = $1 AND integration_name = $2
`

type GetIntegrationsByTeamIdIntegrationNameParams struct {
	TeamID          sql.NullInt64
	IntegrationName IntegrationType
}

func (q *Queries) GetIntegrationsByTeamIdIntegrationName(ctx context.Context, arg GetIntegrationsByTeamIdIntegrationNameParams) ([]Integration, error) {
	rows, err := q.db.QueryContext(ctx, getIntegrationsByTeamIdIntegrationName, arg.TeamID, arg.IntegrationName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Integration
	for rows.Next() {
		var i Integration
		if err := rows.Scan(
			&i.ID,
			&i.TeamID,
			&i.IntegrationName,
			&i.IntegrationData,
			&i.GithubInstallationID,
			&i.VercelInstallationID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getMonitorByTeamIdAndMonitorSlug = `-- name: GetMonitorByTeamIdAndMonitorSlug :one
SELECT id, team_id, monitor_slug, monitor_name, created FROM monitor WHERE team_id = $1 and monitor_slug = $2 LIMIT 1
`

type GetMonitorByTeamIdAndMonitorSlugParams struct {
	TeamID      int64
	MonitorSlug string
}

func (q *Queries) GetMonitorByTeamIdAndMonitorSlug(ctx context.Context, arg GetMonitorByTeamIdAndMonitorSlugParams) (Monitor, error) {
	row := q.db.QueryRowContext(ctx, getMonitorByTeamIdAndMonitorSlug, arg.TeamID, arg.MonitorSlug)
	var i Monitor
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.MonitorSlug,
		&i.MonitorName,
		&i.Created,
	)
	return i, err
}

const getMonitorsByTeamId = `-- name: GetMonitorsByTeamId :many
SELECT id, team_id, monitor_slug, monitor_name, created FROM monitor WHERE team_id = $1 ORDER BY created
`

func (q *Queries) GetMonitorsByTeamId(ctx context.Context, teamID int64) ([]Monitor, error) {
	rows, err := q.db.QueryContext(ctx, getMonitorsByTeamId, teamID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Monitor
	for rows.Next() {
		var i Monitor
		if err := rows.Scan(
			&i.ID,
			&i.TeamID,
			&i.MonitorSlug,
			&i.MonitorName,
			&i.Created,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getTeamByTeamId = `-- name: GetTeamByTeamId :one
SELECT id, team_slug, team_name, stripe_customer_id, team_type, created FROM team WHERE id = $1 LIMIT 1
`

func (q *Queries) GetTeamByTeamId(ctx context.Context, id int64) (Team, error) {
	row := q.db.QueryRowContext(ctx, getTeamByTeamId, id)
	var i Team
	err := row.Scan(
		&i.ID,
		&i.TeamSlug,
		&i.TeamName,
		&i.StripeCustomerID,
		&i.TeamType,
		&i.Created,
	)
	return i, err
}

const getTeamByTeamSlug = `-- name: GetTeamByTeamSlug :one
SELECT id, team_slug, team_name, stripe_customer_id, team_type, created FROM team WHERE team_slug = $1 LIMIT 1
`

func (q *Queries) GetTeamByTeamSlug(ctx context.Context, teamSlug string) (Team, error) {
	row := q.db.QueryRowContext(ctx, getTeamByTeamSlug, teamSlug)
	var i Team
	err := row.Scan(
		&i.ID,
		&i.TeamSlug,
		&i.TeamName,
		&i.StripeCustomerID,
		&i.TeamType,
		&i.Created,
	)
	return i, err
}

const getTeamMembershipByTeamIdUserId = `-- name: GetTeamMembershipByTeamIdUserId :one
SELECT id, team_id, user_id, membership_type, created FROM team_membership WHERE team_id = $1 AND user_id = $2 LIMIT 1
`

type GetTeamMembershipByTeamIdUserIdParams struct {
	TeamID int64
	UserID int64
}

func (q *Queries) GetTeamMembershipByTeamIdUserId(ctx context.Context, arg GetTeamMembershipByTeamIdUserIdParams) (TeamMembership, error) {
	row := q.db.QueryRowContext(ctx, getTeamMembershipByTeamIdUserId, arg.TeamID, arg.UserID)
	var i TeamMembership
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.UserID,
		&i.MembershipType,
		&i.Created,
	)
	return i, err
}

const getTeamsByUserId = `-- name: GetTeamsByUserId :many
SELECT team.id, team.team_slug, team.team_name, team.stripe_customer_id, team.team_type, team.created
FROM team
JOIN team_membership on team.id = team_membership.team_id
WHERE team_membership.user_id = $1
ORDER BY created
`

func (q *Queries) GetTeamsByUserId(ctx context.Context, userID int64) ([]Team, error) {
	rows, err := q.db.QueryContext(ctx, getTeamsByUserId, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Team
	for rows.Next() {
		var i Team
		if err := rows.Scan(
			&i.ID,
			&i.TeamSlug,
			&i.TeamName,
			&i.StripeCustomerID,
			&i.TeamType,
			&i.Created,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT id, email, full_name, created FROM user_info WHERE email = $1 LIMIT 1
`

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (UserInfo, error) {
	row := q.db.QueryRowContext(ctx, getUserByEmail, email)
	var i UserInfo
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.FullName,
		&i.Created,
	)
	return i, err
}

const getUserById = `-- name: GetUserById :one
SELECT id, email, full_name, created FROM user_info WHERE id = $1 LIMIT 1
`

func (q *Queries) GetUserById(ctx context.Context, id int64) (UserInfo, error) {
	row := q.db.QueryRowContext(ctx, getUserById, id)
	var i UserInfo
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.FullName,
		&i.Created,
	)
	return i, err
}

const updateIntegrationTeamIdByGitHubInstallationId = `-- name: UpdateIntegrationTeamIdByGitHubInstallationId :one
UPDATE integration SET team_id = $1 WHERE github_installation_id = $2 RETURNING id, team_id, integration_name, integration_data, github_installation_id, vercel_installation_id
`

type UpdateIntegrationTeamIdByGitHubInstallationIdParams struct {
	TeamID               sql.NullInt64
	GithubInstallationID sql.NullInt64
}

func (q *Queries) UpdateIntegrationTeamIdByGitHubInstallationId(ctx context.Context, arg UpdateIntegrationTeamIdByGitHubInstallationIdParams) (Integration, error) {
	row := q.db.QueryRowContext(ctx, updateIntegrationTeamIdByGitHubInstallationId, arg.TeamID, arg.GithubInstallationID)
	var i Integration
	err := row.Scan(
		&i.ID,
		&i.TeamID,
		&i.IntegrationName,
		&i.IntegrationData,
		&i.GithubInstallationID,
		&i.VercelInstallationID,
	)
	return i, err
}

const updateUserLastAccessedTeam = `-- name: UpdateUserLastAccessedTeam :one
UPDATE user_preference SET last_accessed_team_id = $1
WHERE user_id = $2 RETURNING id, user_id, last_accessed_team_id, created
`

type UpdateUserLastAccessedTeamParams struct {
	LastAccessedTeamID int64
	UserID             int64
}

func (q *Queries) UpdateUserLastAccessedTeam(ctx context.Context, arg UpdateUserLastAccessedTeamParams) (UserPreference, error) {
	row := q.db.QueryRowContext(ctx, updateUserLastAccessedTeam, arg.LastAccessedTeamID, arg.UserID)
	var i UserPreference
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.LastAccessedTeamID,
		&i.Created,
	)
	return i, err
}
