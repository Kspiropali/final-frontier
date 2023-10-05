from sqlalchemy import Column, Integer, String, text
from app.database.db import db


class Item:
    def __init__(self, id, name, type, description, price, image):
        self.id = id
        self.name = name
        self.type = type
        self.description = description
        self.price = price
        self.image = image

    @staticmethod
    def get_items():
        try:
            with db.engine.connect() as connection:
                items = connection.execute(text("SELECT * FROM item"))
                return items.fetchall()
        except Exception as e:
            return f"error: {e}"

    @staticmethod
    def get_item(item_id):
        try:
            with db.engine.connect() as connection:
                item = connection.execute(text("SELECT * FROM item WHERE id=:item_id")
                                          .params(item_id=item_id))
                return item.fetchone()
        except Exception as e:
            return f"error: {e}"

    @staticmethod
    def get_items_details_by_item_arr(arr):
        try:
            # Extract the list from the tuple
            ids = arr[0]

            with db.engine.connect() as connection:
                items = connection.execute(
                    text("SELECT * FROM item WHERE id = ANY(:arr)")
                    .params(arr=ids)
                )
                return items.fetchall()
        except Exception as e:
            return f"error: {e}"
