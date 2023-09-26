from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main', views.main, name='main'),
    path('createticket', views.createticket, name='createticket'),
    path('displayticket', views.displayticket, name='displayticket'),
]