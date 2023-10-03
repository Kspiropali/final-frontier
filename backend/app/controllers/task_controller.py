from ..models.Task import Task


# def get_tasks():
#     tasks = Task.get_tasks()
#     return tasks


def update_task(task_id, data):
    Task.update(task_id, data)
    return 0

def get_task(task_id):
    task = Task.get_task(task_id)
    return task

def delete_task(task_id):
    deleted_task = Task.delete_task(task_id)
    return deleted_task