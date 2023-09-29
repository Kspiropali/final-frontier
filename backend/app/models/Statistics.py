from sqlalchemy import Column, Integer, String, select
from ..database.db import db

class Statistic(db.Model):
    __tablename__ = 'statistics'

    task_id = Column(Integer, primary_key=True)
    member_id = Column(Integer, primary_key=True)
    feedback = Column(String(10000))
    total_time = Column(Integer)

    def __init__(self, task_id, member_id, feedback, total_time):
        self.task_id = task_id
        self.member_id = member_id
        self.feedback = feedback
        self.total_time = total_time

    def get_statistics_by_user(member_id):
        print("MODEL")
        query = Statistic.query.filter_by(member_id=member_id)
        tasks = query.all()
        return tasks
