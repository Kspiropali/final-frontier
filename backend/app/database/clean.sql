-- Clean the member table
DELETE FROM member CASCADE;

-- Clean the item table
DELETE FROM item CASCADE;

-- Clean the task table
DELETE FROM task CASCADE;

-- Clean the session table
DELETE FROM session CASCADE;

-- Clean the email table
DELETE FROM email CASCADE;

-- Clean the member_detail table
DELETE FROM member_detail CASCADE;

-- Clean the statistics table
DELETE FROM statistics CASCADE;