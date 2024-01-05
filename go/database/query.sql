-- name: AddUser :one
INSERT INTO user_info (email, full_name) VALUES ($1, $2) RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM user_info WHERE email = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM user_info WHERE id = $1 LIMIT 1;



-- name: AddUserPreference :one
INSERT INTO user_preference (user_id, last_accessed_team_id)
VALUES ($1, $2) RETURNING *;

-- name: UpdateUserLastAccessedTeam :one
UPDATE user_preference SET last_accessed_team_id = $1
WHERE user_id = $2 RETURNING *;



-- name: GetTeamByTeamSlug :one
SELECT * FROM team WHERE team_slug = $1 LIMIT 1;

-- name: GetTeamByTeamId :one
SELECT * FROM team WHERE id = $1 LIMIT 1;

-- name: CreateNewTeam :one
INSERT INTO team (team_slug, team_name, team_type) VALUES ($1, $2, $3) RETURNING *;

-- name: GetTeamsByUserId :many
SELECT team.*
FROM team
JOIN team_membership on team.id = team_membership.team_id
WHERE team_membership.user_id = $1
ORDER BY created;



-- name: AddTeamMembership :one
INSERT INTO team_membership (team_id, user_id, membership_type)
VALUES ($1, $2, $3) RETURNING *;

-- name: GetTeamMembershipByTeamIdUserId :one
SELECT * FROM team_membership WHERE team_id = $1 AND user_id = $2 LIMIT 1;



-- name: GetMonitorByTeamIdAndMonitorSlug :one
SELECT * FROM monitor WHERE team_id = $1 and monitor_slug = $2 LIMIT 1;

-- name: GetMonitorsByTeamId :many
SELECT * FROM monitor WHERE team_id = $1 ORDER BY created;



-- name: AddIntegration :one
INSERT INTO integration (team_id, integration_name, integration_data, github_installation_id)
VALUES ($1, $2, $3, $4) RETURNING *;

-- name: UpdateIntegrationTeamIdByGitHubInstallationId :one
UPDATE integration SET team_id = $1 WHERE github_installation_id = $2 RETURNING *;

-- name: DeleteIntegrationByGitHubInstallationId :one
DELETE FROM integration WHERE github_installation_id = $1 RETURNING *;

-- name: GetIntegrationsByTeamId :many
SELECT * FROM integration WHERE team_id = $1;

-- name: GetIntegrationsByTeamIdIntegrationName :many
SELECT * FROM integration WHERE team_id = $1 AND integration_name = $2;

-- name: GetIntegrationByTeamIdIntegrationId :one
SELECT * FROM integration WHERE team_id = $1 AND id = $2;

-- name: GetIntegrationByTeamIdIntegrationIdIntegrationName :one
SELECT * FROM integration WHERE team_id = $1 AND id = $2 AND integration_name = $3;
