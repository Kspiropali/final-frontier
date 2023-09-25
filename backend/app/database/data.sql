-- USERS
INSERT INTO
    member(username, email, password, coins, avatar, items, allocated_tasks, is_activated)
VALUES ('bob', 'bob@bob.com', 'bob', 100, 'bob.png', '{}', '{}', TRUE);

INSERT INTO
    member(username, email, password, coins, avatar, items, allocated_tasks, is_activated)
VALUES ('sam', 'sam@sam.com', 'sam', 50, 'sam.png', '{}', '{}', FALSE);

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
