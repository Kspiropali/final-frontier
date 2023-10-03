from sqlalchemy import Column, Integer, String
from ..database.db import db

class Profile(db.Model):
    __tablename__ = 'member_detail'

    id = Column(Integer,primary_key=True)
    avatar = Column(String)
    username = Column(String)
    first_name = Column(String) 
    last_name = Column(String)
    alias = Column(String)
    quote = Column(String)
    summary = Column(String)
    gender = Column(String)

    def __init__(self, member, avatar, username, first_name, last_name, alias, quote, summary, gender):
        self.member = member
        self.avatar = avatar
        self.username = username
        self.first_name = first_name
        self.last_name = last_name 
        self.alias = alias
        self.quote = quote
        self.summary = summary
        self.gender = gender

    @staticmethod
    def get_by_username(username):
        return Profile.query.filter_by(username=username).first()

    def update(self, data):
        for key, value in data.items():
            setattr(self, key, value)
        db.session.commit()
        return Profile.query.filter_by(username=self.username).first()

    def update(self, data):
        for key, value in data.items():
            setattr(self, key, value)
        db.session.commit()