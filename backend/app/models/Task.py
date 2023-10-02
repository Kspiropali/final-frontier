from sqlalchemy import Column, Integer, String, Boolean
from ..database.db import db


class Task(db.Model):
    """Model for the Task table."""
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    description = Column(String(10000), nullable=False)
    # image = Column(String(10000), nullable=False)
    completed = Column(Boolean, default=False)

    def __init__(self, name, description, price, image, completed=False):
        self.id = id
        self.name = name
        self.description = description
        # self.image = image
        self.completed = completed
    
    def make_json(self):
        return {"name": self.name, "description": self.description}

    # def __repr__(self):
    #     return f"<Task, id: {self.id} name: {self.name}, description: {self.description}>"
    
    def update(task_id, data):
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        task.name = data['name']
        task.description = data['description']
        db.session.commit()
    
    def get_task(task_id):
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        return task
    
    def get_tasks():
        query = Task.query.all()
        return query
    
    def delete_task(task_id):
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        db.session.delete(task)
        db.session.commit()
        return "DONE"

    def mark_completed(self):
        self.completed = True
        db.session.commit()
