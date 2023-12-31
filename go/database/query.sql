-- name: AddUser :one
INSERT INTO userinfo (email, full_name, created) VALUES ($1, $2, clock_timestamp()) RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM userinfo WHERE email = $1 LIMIT 1;

-- name: GetUserById :one
SELECT * FROM userinfo WHERE id = $1 LIMIT 1;

-- name: GetTeamByTeamSlug :one
SELECT * FROM team WHERE team_slug = $1 LIMIT 1;

-- name: GetTeamByTeamId :one
SELECT * FROM team WHERE id = $1 LIMIT 1;

-- name: GetTeamMembershipByTeamIdUserId :one
SELECT * FROM team_membership WHERE team_id = $1 AND user_id = $2 LIMIT 1;

-- name: GetTeamsByUserId :many
SELECT team.*
FROM team
JOIN team_membership on team.id = team_membership.team_id
WHERE team_membership.user_id = $1
ORDER BY created;

-- name: GetMonitorByTeamIdAndMonitorSlug :one
SELECT * FROM monitor WHERE team_id = $1 and monitor_slug = $2 LIMIT 1;

-- name: GetMonitorsByTeamId :many
SELECT * FROM monitor WHERE team_id = $1 ORDER BY created;

