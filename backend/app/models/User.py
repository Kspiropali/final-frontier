from sqlalchemy import text

from ..database.db import db

TABLE_NAME = 'member'


class User:

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
        return f"User {self.username}"

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
        print(username, password, email)
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO member (email, username, password) VALUES (:email, :username, :password)")
                    .params(email=email, username=username, password=password)
                )

                con.commit()
                print(result)
                if result.rowcount != 1:
                    return "failed"

                return "success"
        except Exception as e:
            return e

    @staticmethod
    def get_user(user_id):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM member WHERE id = :user_id").params(user_id=user_id)
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
    def update(data):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text(
                        "UPDATE :TABLE_NAME SET email = :email, username = :username, password = :password WHERE id = :user_id"),
                    TABLE_NAME=TABLE_NAME, **data
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
                    text("DELETE FROM :TABLE_NAME WHERE id = :user_id"),
                    TABLE_NAME=TABLE_NAME, user_id=user_id
                )

                con.commit()

                return result
        except Exception as e:
            return e


export = User
