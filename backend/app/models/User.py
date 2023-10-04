import json

from sqlalchemy import text, Column, JSON

from app.database.db import db

# save a big string in a const
DEFAULT_AVATAR = "data:image/png;base64,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"


class User:
    allocated_tasks = Column(JSON)

    def __init__(self, id, email, username, password, coins, avatar, last_logged, items, ongoing_task, allocated_tasks,
                 is_activated):
        self.id = id
        self.email = email
        self.username = username
        self.password = password
        self.coins = coins
        self.avatar = avatar
        self.last_logged = last_logged
        self.items = items
        self.ongoing_task = ongoing_task
        self.allocated_tasks = allocated_tasks
        self.is_activated = is_activated

    @property
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'password': self.password,
            'coins': self.coins,
            'avatar': self.avatar,
            'last_logged': self.last_logged,
            'items': self.items,
            'ongoing_task': self.ongoing_task,
            'allocated_tasks': self.allocated_tasks,
            'is_activated': self.is_activated
        }

    @staticmethod
    def create(username, password, email):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO member (email, username, password) VALUES (:email, :username, :password)")
                    .params(email=email, username=username, password=password)
                )

                con.commit()

                if result.rowcount == 1:
                    return "success"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def get_user(user_id):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member WHERE id = :user_id")
                    .params(user_id=user_id)
                )

                # No need to commit since it's a SELECT query
                return result.fetchone()
        except Exception as e:
            return e

    @staticmethod
    def get_users():
        with db.engine.connect() as con:
            result = con.execute(text("SELECT * FROM member"))

            # Fetch all rows from the query result
            rows = result.fetchall()

            # Returns the rows or process them as needed
            return rows

    @staticmethod
    def update(username, data):
        valid_fields = ['first_name', 'last_name', 'gender', 'alias', 'summary', 'quote']

        try:
            with db.engine.connect() as con:
                set_clause = ', '.join([f"{key} = :{key}" for key in data.keys() if key in valid_fields])

                if set_clause:
                    result = con.execute(
                        text(f"UPDATE member_detail SET {set_clause} WHERE member_username = :username")
                        .params(**data, username=username)
                    )

                    con.commit()

            return "success"
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def delete(user_id):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("DELETE FROM member WHERE id = :user_id")
                    .params(user_id=user_id)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def find_by_email(email):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member WHERE email = :email")
                    .params(email=email)
                )

                return result.fetchone()
        except Exception as e:
            return e

    @staticmethod
    def find_by_username(username):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member WHERE username = :username")
                    .params(username=username)
                )

                return result.fetchone()
        except Exception as e:
            return e

    @staticmethod
    def activate_user(user_id):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("UPDATE member SET is_activated = true WHERE id = :user_id")
                    .params(user_id=user_id)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def update_password(user_id, password):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("UPDATE member SET password = :password WHERE id = :user_id")
                    .params(password=password, user_id=user_id)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def update_coins(user_id, coins):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("UPDATE member SET coins = :coins WHERE id = :user_id")
                    .params(coins=coins, user_id=user_id)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def initialise_tasks(user_id, tasks):
        try:
            updated_tasks_json = json.loads(tasks)
            updated_tasks = [task["id"] for task in updated_tasks_json]
            with db.engine.connect() as con:
                result = con.execute(
                    text("UPDATE member SET allocated_tasks = :tasks WHERE id = :user_id")
                    .params(tasks=updated_tasks, user_id=user_id)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def create_member_details(username):

        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO member_detail (member_username, avatar) VALUES (:username, :avatar)")
                    .params(username=username, avatar=DEFAULT_AVATAR)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def get_user_basic_details(username):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member_detail WHERE member_username = :username")
                    .params(username=username)
                )

                return result.fetchone()
        except Exception as e:
            return e

    @staticmethod
    def activate_by_email(email):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("UPDATE member SET is_activated = true WHERE email = :email")
                    .params(email=email)
                )

                con.commit()

                return result
        except Exception as e:
            return e

    @staticmethod
    def has_item(username, item_id):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member_item WHERE member_username = :username AND item_id = :item_id")
                    .params(username=username, item_id=item_id)
                )

                return result.fetchone() is not None
        except Exception as e:
            return e

    @staticmethod
    def add_item(username, item):
        try:
            with db.engine.connect() as con:
                # update the member table, add the item to the user's items, and remove the price from the user's money,
                con.execute(
                    text("UPDATE member SET coins = coins - :price WHERE username = :username")
                    .params(price=item.price, username=username)
                )

                # items in user table is a list of item ids, append the new item id to the list
                con.execute(
                    text("UPDATE member SET items = array_append(items, :item_id) WHERE username = :username")
                    .params(item_id=item.id, username=username)
                )

                con.commit()

                return result
        except Exception as e:
            return f"error: {str(e)}"

    @staticmethod
    def get_items(username):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT items FROM member WHERE username = :username")
                    .params(username=username)
                )

                return result.fetchone()
        except Exception as e:
            return e

    @staticmethod
    def get_coins(username):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT coins FROM member WHERE username = :username")
                    .params(username=username)
                )

                return result.fetchone()
        except Exception as e:
            return e

export = User
