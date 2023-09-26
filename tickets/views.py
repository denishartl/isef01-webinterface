from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def index(request):
    print('Request for index page received')
    return render(request, 'tickets/index.html')

def main(request):
    print('Request for main page received')
    return render(request, 'tickets/main.html')

def createticket(request):
    print('Request for createticket page received')
    return render(request, 'tickets/createticket.html')

def displayticket(request):
    print('Request for displayticket page received')
    return render(request, 'tickets/displayticket.html')