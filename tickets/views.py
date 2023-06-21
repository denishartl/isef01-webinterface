from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json

def index(request):
    response = requests.get("https://iu-isef01-functionapp.azurewebsites.net/api/getcourses")
    print('Request for index page received')
    return render(request, 'tickets/index.html', {'courses': json.loads(response.content)})
    #return render(request, 'tickets/index.html')

@csrf_exempt
def hello(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        
        if name is None or name == '':
            print("Request for hello page received with no name or blank name -- redirecting")
            return redirect('index')
        else:
            print("Request for hello page received with name=%s" % name)
            context = {'name': name }
            return render(request, 'tickets/hello.html', context)
    else:
        return redirect('index')
    