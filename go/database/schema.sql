DROP TYPE IF EXISTS team_type CASCADE;
CREATE TYPE team_type AS ENUM ('PERSONAL', 'TEAM');

DROP TYPE IF EXISTS membership_type CASCADE;
CREATE TYPE membership_type AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

DROP TYPE IF EXISTS integration_type CASCADE;
CREATE TYPE integration_type AS ENUM ('GITHUB', 'POSTHOG', 'RAILWAYAPP', 'VERCEL');

DROP TABLE IF EXISTS user_info CASCADE;
CREATE TABLE user_info (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS user_preference CASCADE;
CREATE TABLE user_preference (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  user_id BIGINT UNIQUE REFERENCES user_info (id) ON DELETE CASCADE NOT NULL,
  last_accessed_team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS team CASCADE;
CREATE TABLE team (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_slug TEXT UNIQUE NOT NULL,
  team_name TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  team_type TEAM_TYPE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS team_membership CASCADE;
CREATE TABLE team_membership (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  user_id BIGINT REFERENCES user_info (id) ON DELETE CASCADE NOT NULL,
  membership_type MEMBERSHIP_TYPE NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (team_id, user_id)
);

DROP TABLE IF EXISTS team_invite CASCADE;
CREATE TABLE team_invite (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  invite_code TEXT UNIQUE NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  invitee_email TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (team_id, invitee_email)
);

DROP TABLE IF EXISTS monitor CASCADE;
CREATE TABLE monitor (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  monitor_slug TEXT NOT NULL,
  monitor_name TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (team_id, monitor_slug)
);

DROP TABLE IF EXISTS integration CASCADE;
CREATE TABLE integration (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE DEFAULT NULL,
  integration_name INTEGRATION_TYPE NOT NULL,
  integration_data JSONB DEFAULT NULL, -- Includes access, refresh tokens, etc
  github_installation_id BIGINT UNIQUE DEFAULT NULL, -- Only Used for GitHub
  vercel_installation_id TEXT UNIQUE DEFAULT NULL -- Only Used for Vercel
);

