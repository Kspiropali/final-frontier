from sqlalchemy import Column, Integer, String
from app.database.db import db


class Item(db.Model):
    """Model for the Item table."""
    __tablename__ = 'item'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    # added type
    type = Column(String(255), nullable=False)
    description = Column(String(10000), nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String(10000), nullable=False)

    def __init__(self, name, type, description, price, image):
        self.name = name
        self.type = type
        self.description = description
        self.price = price
        self.image = image

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type,
            'description': self.description,
            'price': self.price,
            'image': self.image
        }

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self.serialize

    @staticmethod

    def get_item(item_id):
        item = Item.query.get_or_404(item_id)
        return item.serialize
    
    def get_items():
        items = Item.query.all()
        return items

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
