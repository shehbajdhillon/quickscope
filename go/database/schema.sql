DROP TYPE IF EXISTS team_type CASCADE;
CREATE TYPE team_type AS ENUM ('PERSONAL', 'TEAM');

DROP TYPE IF EXISTS membership_type CASCADE;
CREATE TYPE membership_type AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

DROP TABLE IF EXISTS userinfo CASCADE;
CREATE TABLE userinfo (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS team CASCADE;
CREATE TABLE team (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  team_type TEAM_TYPE NOT NULL,
  created TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS team_membership CASCADE;
CREATE TABLE team_membership (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  user_id BIGINT REFERENCES userinfo (id) ON DELETE CASCADE NOT NULL,
  membership_type MEMBERSHIP_TYPE NOT NULL,
  created TIMESTAMP NOT NULL
);

DROP TABLE IF EXISTS team_invite CASCADE;
CREATE TABLE team_invite (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  team_id BIGINT REFERENCES team (id) ON DELETE CASCADE NOT NULL,
  invitee_email TEXT NOT NULL,
  created TIMESTAMP NOT NULL,
  UNIQUE (team_id, invitee_email)
);

