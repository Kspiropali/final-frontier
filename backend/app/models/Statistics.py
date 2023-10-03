from sqlalchemy import Column, Integer, String, select
from app.database.db import db

class Statistic(db.Model):
    __tablename__ = 'statistics'

    task_id = Column(Integer, primary_key=True)
    username = Column(String(10000), primary_key=True)
    feedback = Column(String(10000))
    total_time = Column(Integer)

    def __init__(self, task_id, username, feedback, total_time):
        self.task_id = task_id
        self.username = username
        self.feedback = feedback
        self.total_time = total_time

    def get_statistics_by_user(username):
        query = Statistic.query.filter_by(username=username)
        tasks = query.all()
        return tasks