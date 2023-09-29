from ..models.Statistics import Statistic

def get_stats_by_user(user_id):
    tasks = Statistic.get_statistics_by_user(user_id)
    return tasks