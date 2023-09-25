from sqlalchemy import Column, Integer, String
from ..database.db import db


class Item(db.Model):
    """Model for the Item table."""
    __tablename__ = 'item'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    description = Column(String(10000), nullable=False)
    price = Column(Integer, nullable=False)
    image = Column(String(10000), nullable=False)

    def __init__(self, name, description, price, image):
        self.name = name
        self.description = description
        self.price = price
        self.image = image

    def __repr__(self):
        return f"<Item {self.name}>"

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
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

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
