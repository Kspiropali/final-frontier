from ..models.Task import Task

def get_tasks():
    # tasks = Task.query.all()
    # tasks_list = []
    # for item in tasks:
    #     print(item)
    #     tasks_list.append(item)
    # # print(tasks_list)
    # return tasks_list
    tasks = Task.get_tasks()
    return tasks

def update_task(task_id, data):
    # print(data)
    Task.update(task_id, data)
    return 0
