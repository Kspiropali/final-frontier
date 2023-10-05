from app.models.Statistics import Statistic

def get_stats_by_user(username):
    tasks = Statistic.get_statistics_by_user(username)
    return tasks

def create_stat(data):
    stat = Statistic.create_statistic(data)
    return stat