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
    description VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE member (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  coins INTEGER NOT NULL DEFAULT 0,
  avatar VARCHAR(255) NOT NULL DEFAULT 'https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png',
  last_logged TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- probably not needed
  items INTEGER[] NOT NULL DEFAULT '{}',
  ongoing_task jsonb NOT NULL DEFAULT '{}', -- will be in format {task_id: 1, start_time: TIMESTAMP}, TODO: endpoint for start time
  allocated_tasks INTEGER[] NOT NULL DEFAULT '{}',
  is_activated BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL
);

CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES member(id) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES member(id) NOT NULL,
    token VARCHAR(255) NOT NULL,
    is_reset BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- TODO: probably expiration would be 10 minutes
    expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '10 minutes'
);

CREATE TABLE member_detail (
    member_id INTEGER PRIMARY KEY REFERENCES member(id) NOT NULL,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    alias VARCHAR(255) DEFAULT NULL,
    quote VARCHAR(255) DEFAULT NULL,
    summary VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(255) DEFAULT NULL
);

CREATE TABLE statistics (
    member_id INTEGER REFERENCES member(id) NOT NULL,
    task_id INTEGER REFERENCES task(id) NOT NULL,
    feedback VARCHAR(255) DEFAULT NULL,
    total_time INTEGER DEFAULT 0,
    primary key (member_id, task_id) -- COMPOSITE KEY
);