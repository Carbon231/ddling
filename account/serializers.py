from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'importance', 'due_date']

    def create(self, validated_data):
        user = self.context['request'].user
        task = Task.objects.create(user=user, **validated_data)
        return task
