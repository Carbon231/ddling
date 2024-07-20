from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from rest_framework import generics
from .models import Task, login_data
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


def index(request):
    return render(request, 'index.html')


def contact(request):
    return render(request, 'contact.html')


def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        login_data.objects.create(username=username, password=password)
        return render(request, "register.html", {"tip": "注册成功啦！登陆看看叭"})


def sign_in(request):
    if request.method == 'GET':
        return render(request, 'sign in.html')
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        data = login_data.objects.filter(username=username)
        num = data.count()
        if num == 0:
            return render(request, 'sign in.html', {"tip": "QAQ没找到用户欸，要不先注册一个呢"})
        elif num == 1:
            data = data.first()
            if data.password == password:
                # TODO 这里跳转到日历主界面
                return render(request, 'home.html')
            else:
                return render(request, 'sign in.html', {"tip": "密码好像错了QAQ 再想想呢"})

def user_center(request):
    return render(request, 'user_center.html')