DROP TABLE IF EXISTS member CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS session CASCADE;
DROP TABLE IF EXISTS email CASCADE;
DROP TABLE IF EXISTS member_detail CASCADE;
DROP TABLE IF EXISTS statistics CASCADE;

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image BYTEA NOT NULL
);

CREATE TABLE member (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  coins INTEGER NOT NULL DEFAULT 0,
  items INTEGER[] NOT NULL DEFAULT '{}',
  allocated_tasks INTEGER[] NOT NULL DEFAULT '{}',
  is_activated BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) REFERENCES member(username) NOT NULL, -- If unique, then only one session per user
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email (
    id SERIAL PRIMARY KEY,
    username varchar(255) REFERENCES member(username) NOT NULL,
    token VARCHAR(255) NOT NULL,
    is_reset BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TODO: probably expiration would be 10 minutes
    expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '10 minutes'
);

CREATE TABLE statistics (
    username VARCHAR(255) REFERENCES member(username) NOT NULL,
    task_id INTEGER REFERENCES task(id) NOT NULL,
    feedback VARCHAR(255) DEFAULT NULL,
    total_time INTEGER DEFAULT 0,
    primary key (username, task_id) -- COMPOSITE KEY
);

CREATE TABLE member_detail (
    member_username VARCHAR(255) PRIMARY KEY REFERENCES member(username) NOT NULL,
    avatar BYTEA DEFAULT '{{DEFAULT_AVATAR}}',
    character BYTEA DEFAULT '{{DEFAULT_CHARACTER}}',
    background BYTEA DEFAULT '{{DEFAULT_BACKGROUND}}',
    username VARCHAR(255) REFERENCES member(username),
    first_name VARCHAR(255) DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    alias VARCHAR(255) DEFAULT NULL,
    quote VARCHAR(255) DEFAULT NULL,
    summary VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(255) DEFAULT NULL
);