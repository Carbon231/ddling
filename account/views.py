from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.permissions import IsAuthenticated
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
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class ListTasksView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


def index(request):
    return render(request, 'index.html')


def contact(request):
    return render(request, 'contact.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.create_user(username=username, password=password)
        user.save()
        auth_login(request, user)
        return HttpResponseRedirect(reverse('home'))
    else:
        return render(request, 'register.html')


def sign_in(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return redirect('home')  # 重定向到首页或其他页面
        else:
            return render(request, 'sign in.html', {"tip": "用户名或密码错误"})
    else:
        return render(request, 'sign in.html')


def user_center(request):
    return render(request, 'user_center.html')