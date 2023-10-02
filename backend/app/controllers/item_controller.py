from ..models.Item import Item

def get_items():
    items = Item.query.all()
    return items

def get_item(item_id):
    item = Item.query.get_or_404(item_id)
    return item

# def purchase_item(item_id, user):
#     item = Item.query.get_or_404(item_id)

#     if user.coins < item.price:
#         return {"error": "Insufficient coins"}

#     try:
#         # Deduct the item's price from user's coins
#         user.coins -= item.price

#         # Add the purchased item to the user's inventory (implement this part)
#         # This depends on how you handle user inventories

#         # Save the updated user and perform other necessary operations
#         db.session.commit()

#         return {"message": "Purchase successful"}
#     except:
#         db.session.rollback()
#         return {"error": "Error occurred while processing the purchase"}