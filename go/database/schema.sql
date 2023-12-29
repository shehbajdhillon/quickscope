DROP TABLE IF EXISTS userinfo CASCADE;
CREATE TABLE userinfo (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  created TIMESTAMP NOT NULL
);
