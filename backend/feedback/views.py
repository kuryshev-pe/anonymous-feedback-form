from random import randint

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.

def message(request):
    r = randint(0,10000)+1
    return HttpResponse('{"message": "Test'+str(r)+'!"}')


def trigger_error(request):
    division_by_zero = 1 / 0


def save_feedback(request):
    if request.method != 'POST':
        print("Not POST")
        return JsonResponse({"status": "ok"})
    else:
        print("POST")
        print(request.json)
        return JsonResponse({"status": "ok"})
        
