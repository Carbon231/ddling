from datetime import datetime, timedelta
import datetime
from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    class Status(models.IntegerChoices):
        BACKLOG = 0, "backlog"
        TODO = 1, "todo"
        IN_PROGRESS = 2, "in progress"
        DONE = 3, "done"

    class Importance(models.IntegerChoices):
        HIGH = 0, "high"
        MEDIUM = 1, "medium"
        LOW = 2, "low"

    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    status = models.PositiveIntegerField(choices=Status.choices, default=Status.BACKLOG)
    importance = models.PositiveIntegerField(choices=Importance.choices, default=Importance.MEDIUM)
    due_date = models.DateField(default=datetime.date.today()+timedelta(days=1))
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)

    def __str__(self):
        return (
            f"task (" 
            f"title: {self.title}, " 
            f"status: {self.status}, "
            f"importance: {self.importance}, "
            f"due_date: {self.due_date})"
        )
