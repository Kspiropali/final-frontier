from sqlalchemy import text

from ..database.db import db

TABLE_NAME = 'tasks'


class Task2:

    def __init__(self, id, name, description, image):
        self.id = id
        self.name = name
        self.description = description
        self.image = image

    def __repr__(self):
        return f"User {self.name}"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image
        }

    @staticmethod
    def create(name, description, image):
        print(name, description, image)
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO task (name, description, image) VALUES (:name, :description, :image)")
                    .params(name=name, description=description, image=image)
                )

                con.commit()
                print(result)
                if result.rowcount != 1:
                    return "failed"

                return "success"
        except Exception as e:
            return e

    # @staticmethod
    # def get_user(user_id):
    #     try:
    #         with db.engine.connect() as con:
    #             result = con.execute(
    #                 text("SELECT * FROM member WHERE id = :user_id").params(user_id=user_id)
    #             )
    #             return result.fetchone()
    #     except Exception as e:
    #         return e

    @staticmethod
    # def get_users():
    #     with db.engine.connect() as con:
    #         result = con.execute(text("SELECT * FROM member"))

            # Fetch all rows from the query result
            # rows = result.fetchall()

            # Print the rows or process them as needed
            # return rows

    @staticmethod
    def update(data):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text(
                        "UPDATE :TABLE_NAME SET name = :name, description = :description, image = :image WHERE id = :user_id"),
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


export = Task2