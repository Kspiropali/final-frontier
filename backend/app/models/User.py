import json

from sqlalchemy import text, Column, JSON
from datetime import datetime
from app.database.db import db


class User:
    allocated_tasks = Column(JSON)

    def __init__(self, id, email, username, password, coins, avatar, last_logged, items, ongoing_task, allocated_tasks,
                 is_activated, streak, day_start):
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
        self.streak = streak
        self.day_start = day_start

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
        valid_fields = ['first_name', 'last_name', 'gender', 'alias', 'summary', 'quote', "avatar", "background", "character"]

        try:
            with db.engine.connect() as con:
                set_clause = ', '.join([f"{key} = :{key}" for key in data.keys() if key in valid_fields])

                if set_clause:
                    con.execute(
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
                    text("INSERT INTO member_detail (member_username) VALUES (:username)")
                    .params(username=username)
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


    @staticmethod
    def update_streak(user_id, streak_number):
        try:
            with db.engine.connect() as con:
                con.execute(
                    text("UPDATE member SET streak = :streak WHERE id = :user_id")
                    .params(streak=streak_number, user_id=user_id)
                )

                if streak_number > 1:
                    con.execute(
                        text("UPDATE member SET day_start = :day_start WHERE id = :user_id")
                        .params(day_start=datetime.now(), user_id=user_id)
                    )

                con.commit()

                return "success"
        except Exception as e:
            print(e)
            return e


export = User
