from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('hello', views.hello, name='hello'),
    path('create_ticket', views.create_ticket, name='create_ticket'),
    
]