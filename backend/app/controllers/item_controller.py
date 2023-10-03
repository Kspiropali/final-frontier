from app.models.Item import Item
from app.models.User import User


def get_all_items():
    try:
        items = Item.get_items()
        return items
    except Exception as e:
        return f"error: {e}"


def get_item(item_id):
    try:
        item = Item.get_item(item_id)
        return item
    except Exception as e:
        return f"error: {e}"


def buy(username, item_id):
    try:
        # get item
        item = get_item(item_id)

        user = User.find_by_username(username)

        # check if user has enough money
        if user.coins < item.price:
            return "error: not enough money"

        # check if user already has item
        if item.id in user.items:
            return "error: already owns item"

        # add item to user and remove money
        User.add_item(username, item)

        return "success"
    except Exception as e:
        return f"error: {e}"


def get_items_by_user(username):
    try:
        items = User.get_items(username)

        return items
    except Exception as e:
        return f"error: {e}"


def get_items_by_arr(arr):
    try:
        items = Item.get_items_details_by_item_arr(arr)

        return items
    except Exception as e:
        return f"error: {e}"
