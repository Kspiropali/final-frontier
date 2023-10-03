from ..models.Item import Item

def get_items():
    items = Item.query.all()
    return items

def get_item(item_id):
    item = Item.query.get_or_404(item_id)
    return item