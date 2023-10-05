import pytest
from app.models.Task import Task
from app.database.db import db, setup_tables, clean_tables
from app import app as flask_app
from sqlalchemy import create_engine, func


@pytest.fixture
def app():
    app = flask_app.test_client()
    with flask_app.app_context():
        setup_tables()
        yield app
        clean_tables()

def test_update(app):
    result = Task.create(1, 'bob', 'bob', 10, True)
    print(result)
    result2 = Task.update(1, {'name': 'bill', 'description': 'bill'})
    assert result == 'success'

def test_get_task(app):
    user_id = 1
    Task.create(1, 'bob', 'bob', 10, True)
    user = Task.get_task(1)
    assert user.id == user_id

def test_get_tasks(app):
    Task.create(1, 'bob', 'bob', 10, True)
    Task.create(2, 'bill', 'bill', 10, True)
    tasks = Task.get_tasks()
    assert len(tasks) == 2

def test_create_tasl(app):
    result = Task.create(1, 'bob', 'bob', 10, True)
    assert result == "success"

def test_delete_task(app):
    task_id = 1
    Task.create(1, 'bob', 'bob', 10, True)
    result = Task.delete_task(task_id)
    assert result == "DONE"

def test_mark_completed(app):
    task = Task(name='myTask', description='myTask description', duration=10, price=10, image="image.jpg")
    task.mark_completed()
    assert task.completed == True