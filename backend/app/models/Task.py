from sqlalchemy import Column, Integer, String, select
from ..database.db import db


class Task(db.Model):
    """Model for the Task table."""
    __tablename__ = 'task'

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    description = Column(String(10000), nullable=False)
    # image = Column(String(10000), nullable=False)

    def __init__(self, name, description, price, image):
        self.id = id
        self.name = name
        self.description = description
        # self.image = image
    
    def make_json(self):
        return {"name": self.name, "description": self.description}

    # def __repr__(self):
    #     return f"<Task, id: {self.id} name: {self.name}, description: {self.description}>"
    
    def update(task_id, data):
        print(data['name'])
        query = Task.query.filter_by(id=task_id)
        task = query.first()
        print(task)
        task.name = data['name']
        task.description = data['description']
        print(task)
        db.session.commit()
    
    def get_tasks():
        query = Task.query.all()
        print(query[0].id)
        return query

