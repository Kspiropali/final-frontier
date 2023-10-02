from ..models.Statistics import Statistic

def get_stats_by_user(username):
    tasks = Statistic.get_statistics_by_user(username)
    return tasks