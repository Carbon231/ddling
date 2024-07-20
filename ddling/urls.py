"""ddling URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from account import views
from account.views import home_view, calendar_view, TaskUpdateView, TaskDeleteView, ListTasksView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')),
    path('home/', home_view, name='home'),
    path('api/<int:pk>/', TaskUpdateView.as_view(), name='update-task'),
    path('api/<int:pk>/delete/', TaskDeleteView.as_view(), name='delete-task'),
    path('api/', ListTasksView.as_view(), name='list-task'),
    path('calendar/', calendar_view, name='calendar'),

    path('', views.index, name='index'),
    path('index/', views.index, name='index'),
    path('contact/', views.contact, name='contact'),
    path('register/', views.register, name='register'),
    path('user_center/', views.user_center, name='user_center'),
    path('sign in/', views.sign_in, name='sign in'),
]
