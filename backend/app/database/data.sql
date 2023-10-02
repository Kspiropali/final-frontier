-- USERS
INSERT INTO
    member(username, email, password, coins, avatar, items, allocated_tasks, is_activated)
VALUES ('bob', 'bob@bob.com', '$2b$12$8tDf1A4Iq2tkwv.4DSJkC.DvuPVcgy7t4r95hnK7tGYdjIkcl/LlS', 100, 'bob.png', '{}', '{}', TRUE);

INSERT INTO
    member(username, email, password, coins, avatar, items, allocated_tasks, is_activated)
VALUES ('sam', 'sam@sam.com', '$2b$12$uZllZLq8kxU2srej7pv7Zum7ULiOa6lrUEhdVWXfErnKsshyjYY02', 50, 'sam.png', '{}', '{}', FALSE);

-- TASKS
INSERT INTO
    task(name, description, duration)
VALUES ('task1', 'task1 description', 10);

INSERT INTO
    task(name, description, duration)
VALUES ('task2', 'task2 description', 20);

INSERT INTO
    task(name, description, duration)
VALUES ('task3', 'task3 description', 30);

-- ITEMS
INSERT INTO
    item(name, description, price, image)
VALUES ('item1', 'item1 description', 10, 'item1.png');

INSERT INTO
    item(name, description, price, image)
VALUES ('item2', 'item2 description', 20, 'item2.png');

INSERT INTO
    item(name, description, price, image)
VALUES ('item3', 'item3 description', 30, 'item3.png');

-- User verification EMAILS
INSERT INTO
    email(username, token)
VALUES ('sam', 'sam');

-- MEMBER DETAILS
INSERT INTO
    member_detail(member_id, first_name, last_name, alias, quote, summary, gender)
VALUES (1, 'Bobby', 'Baum', 'Bobman', 'Best mage in wotlk', 'I am a potato', 'male');

-- STATISTICS
INSERT INTO
    statistics(username, task_id, feedback, total_time)
VALUES ('bob', 1, 'Well done', 25);