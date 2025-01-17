from django.urls import path
from .views import register, get_registered_users, delete_user

urlpatterns = [
    path('register/', register, name='register'),
    path('users/', get_registered_users, name='get_registered_users'),
    path('delete/', delete_user, name='delete_user')
]