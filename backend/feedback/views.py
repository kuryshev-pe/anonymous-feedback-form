import json
from random import randint

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from feedback.models import FeedbackInfo

# Create your views here.

def message(request):
    r = randint(0,10000)+1
    return HttpResponse('{"message": "Test'+str(r)+'!"}')


def trigger_error(request):
    division_by_zero = 1 / 0


def save_feedback(request):
    if request.method != 'POST':
        return JsonResponse({"status": "nok"}, status=400)
    else:

        data = json.loads(request.body)
        info = FeedbackInfo()
        info.department = data["department"]
        info.category = data["category"]
        if "email" in data:
            info.email = data["email"]
        info.message = data["message"]

        info.save()
        
        return JsonResponse({"status": "ok"})
        
