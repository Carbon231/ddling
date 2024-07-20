from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer


def home_view(request):
    return render(request, 'home.html', {})


def calendar_view(request):
    return render(request, 'calendar.html', {})


class TaskUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class ListTasksView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer