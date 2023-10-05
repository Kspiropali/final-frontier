# import pytest
# from app.models.Statistics import Statistic
# from app.models.User import User
# from app.models.Task import Task
# from app.database.db import db, setup_tables, clean_tables
# from app import app as flask_app
# from sqlalchemy import create_engine, func
#
#
# @pytest.fixture
# def app():
#     app = flask_app.test_client()
#     with flask_app.app_context():
#         setup_tables()
#         yield app
#         # clean_tables()
#
# def test_get_statistics_by_user(app):
#     User.create(username='test_user1', password='test_password1', email='test1@example.com')
#     Task.create(1, 'bob', 'bob', 10, True)
#     result = Statistic.create('test_user1', 1, 'test feedback', 10)
#     print(result)
#     result2 = Statistic.get_statistics_by_user('test_user1')
#     assert len(result2) == 1