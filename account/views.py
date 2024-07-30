from calendar import calendar
from datetime import datetime, timezone
from datetime import timedelta
from datetime import date
from calendar import monthrange
import json
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from django.utils import timezone
from datetime import timedelta


def home_view(request):
    return render(request, 'home.html', {})


def record_view(request):
    task_done = history_data_done(request)
    task_undone = history_data_undone(request)
    task_done_json = json.dumps(list(task_done))
    task_undone_json = json.dumps(list(task_undone))
    completed = len(task_done)
    imcompleted = len(task_undone)
    total = completed + imcompleted
    return render(request, 'record.html',
                  {"completed": completed, "imcompleted": imcompleted, "total": total, "task_done": task_done_json,
                   "task_undone": task_undone_json})


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
        if User.objects.filter(username=username).exists():
            return render(request, 'register.html', {'error': 'Username already exist'})
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
    if request.method == 'GET':
        return render(request, 'user_center.html', {"username": request.user.username})
    else:
        username = request.user.username
        password = request.POST['password']
        user = User.objects.get(username=username)
        user.set_password(password)
        user.save()
        return HttpResponseRedirect(reverse('index'))


def task_to_dict(task):
    return {
        'title': task.title,
        'description': task.description,
        'status': task.get_status_display(),  # 使用choices的显示值
        'importance': task.get_importance_display(),  # 使用choices的显示值
        'due_date': task.due_date.isoformat(),  # 将日期转换为ISO格式字符串
    }


def calendar_view(request):
    noticelist = notice_data(request)
    noticeList = json.dumps(noticelist)
    return render(request, 'calendar.html', {"noticeList": noticeList})


def calendar_data(request):
    if request.method == 'POST':
        date = request.POST.get('date', '2024-07-11').split('-')
        year = int(date[0])
        month = int(date[1])
        _, last_day_of_month = monthrange(year, month)
        last_day_of_month = datetime(year, month, last_day_of_month).date()
        first_day_of_month = datetime(year, month, 1).date()
        current_day = first_day_of_month
        ans = {}
        while current_day <= last_day_of_month:
            ans.setdefault(current_day.strftime("%Y-%m-%d"), [])
            current_day += timedelta(days=1)
        user_now = request.user
        task_list = Task.objects.filter(user=user_now)
        for task in task_list:
            if first_day_of_month <= task.due_date <= last_day_of_month:
                ans[task.due_date.strftime("%Y-%m-%d")].append(task_to_dict(task))
        return JsonResponse(ans)


def notice_data(request):
    today = timezone.now().date()
    day_after = today + timedelta(days=10)
    user_now = request.user
    task_list = Task.objects.filter(user=user_now)
    ans = []
    for task in task_list:
        if task.due_date >= today and task.due_date < day_after and task.status != 'done':
            ans.append(task_to_dict(task))
    return ans


def history_data_done(request):
    today = date.today()
    user_now = request.user
    task_list = Task.objects.filter(user=user_now)
    ans = []
    for task in task_list:
        if task.due_date < today and task.get_status_display() == 'done':
            ans.append(task_to_dict(task))
    return ans


def history_data_undone(request):
    today = date.today()
    user_now = request.user
    task_list = Task.objects.filter(user=user_now)
    ans = []
    for task in task_list:
        if task.due_date < today and task.get_status_display() != 'done':
            ans.append(task_to_dict(task))
    return ans