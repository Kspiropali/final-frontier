import json

from sqlalchemy import text, Column, JSON

from ..database.db import db


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

    def __repr__(self):
        return f"<User {self.username, self.email}>"

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

            # Print the rows or process them as needed
            return rows

    @staticmethod
    def update(user_id, data):
        try:
            with db.engine.connect() as con:
                for key in data.keys():
                    result = con.execute(
                        text(f"UPDATE member SET {key} = :value WHERE id = :user_id")
                        .params(value=data.get(key), user_id=user_id)
                    )

                    con.commit()

                return result
        except Exception as e:
            return e

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
                print("Successfully updated")
                return result
        except Exception as e:
            return e


export = User
