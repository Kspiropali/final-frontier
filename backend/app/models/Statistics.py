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

    @staticmethod
    def get_statistics_by_user(username):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("SELECT * FROM statistics WHERE username = :username")
                    .params(username=username)
                )

                print(result.rowcount)

                if result.rowcount != 0:
                    return result.fetchall()
                else:
                    return "error: Session not found"
        except Exception as e:
            return f"error {str(e)}"
    
    @staticmethod
    def create_statistic(data):
        print(data)
        task_id = data['task_id']
        username = data['username']
        feedback = data['feedback']
        total_time = data['total_time']

        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO statistics (task_id, username, feedback, total_time) VALUES (:task_id, :username, :feedback, :total_time)")
                    .params(task_id=task_id, username=username, feedback=feedback, total_time=total_time)
                )

                con.commit()

                if result.rowcount == 1:
                    return result
                else:
                    return "error: Session not created"
        except Exception as e:
            return f"error {str(e)}"
