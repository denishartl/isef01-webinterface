from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    print('Request for index page received')
    return render(request, 'create_ticket/index.html')

@csrf_exempt
def create_ticket(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        
        if name is None or name == '':
            print("Request for hello page received with no name or blank name -- redirecting")
            return redirect('index')
        else:
            print("Request for hello page received with name=%s" % name)
            context = {'name': name }
            return render(request, 'create_ticket/hello.html', context)
    else:
        return redirect('index')
    

def test(request):
    print('Request for test page received')
    return render(request, 'hello_azure/test.html')