from sqlalchemy import Column, Integer, String, Boolean, text, func
from app.database.db import db
import json


class Task(db.Model):
    """Model for the Task table."""
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    description = Column(String(10000), nullable=False)
    duration = Column(String(10000))
    # image = Column(String(10000), nullable=False)
    completed = Column(Boolean, default=False)

    
    #def __init__(self, name, description, duration, image):
    def __init__(self, name, description, duration, price, image, completed=False):
        self.id = id
        self.name = name
        self.description = description
        self.duration = duration
        # self.image = image
        self.completed = completed
    
    # def make_json(self):
    #     return {"name": self.name, "description": self.description, "duration": self.duration}

    # def __repr__(self):
    #     return f"<Task, id: {self.id} name: {self.name}, description: {self.description}>"
    
    def update(task_id, data):
        query = Task.query.filter_by(id=task_id)
        task = query.first()

        task.name = data['name']
        task.description = data['description']
        db.session.commit()
        return task
    
    def get_task(task_id):
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        return task
    
    def get_tasks():
        query = Task.query.order_by(func.random()).limit(6)
        tasks = query.all()
        return tasks
    
    def delete_task(task_id):
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        db.session.delete(task)
        db.session.commit()
        return "DONE"

    def mark_completed(self):
        self.completed = True
        db.session.commit()

    @staticmethod
    def create(id, name, description, duration, completed):
        try:
            with db.engine.connect() as con:
                result = con.execute(
                    text("INSERT INTO task (id, name, description, duration, completed) VALUES (:id, :name, :description, :duration, :completed)")
                    .params(id=id, name=name, description=description, duration=duration, completed=completed)
                )

                con.commit()

                if result.rowcount == 1:
                    return "success"
        except Exception as e:
            return f"error: {str(e)}"        
