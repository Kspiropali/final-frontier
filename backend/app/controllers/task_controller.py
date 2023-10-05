from app.models.Task import Task


# def get_tasks():
#     tasks = Task.get_tasks()
#     return tasks

def create_task(data):
    task = Task.create(data.id, data.name, data.description, data.duration, data.completed)
    return task


def update_task(task_id, data):
    task = Task.update(task_id, data)
    return task

def get_task(task_id):
    task = Task.get_task(task_id)
    return task

def delete_task(task_id):
    deleted_task = Task.delete_task(task_id)
    return deleted_task

def mark_task_completed(task_id):
  task = Task.query.get(task_id)
  task.mark_completed()
  return {"message": "Task marked completed"}

def get_task_by_arr(ids):

    return Task.get_task_by_arr(ids)
