from sqlalchemy import Column, Integer, String, select, text
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
        print("MODEL")
        query = Statistic.query.filter_by(username=username)
        tasks = query.all()
        return tasks
    
    @staticmethod
    def create(username, task_id, feedback, total_time):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO statistics (username, task_id, feedback, total_time) VALUES (:username, :task_id, :feedback, :total_time)")
                    .params(username=username, task_id=task_id, feedback=feedback, total_time=total_time)
                )

                con.commit()

                if result.rowcount == 1:
                    return "success"
        except Exception as e:
            return f"error: {str(e)}"    