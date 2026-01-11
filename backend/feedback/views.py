import json

from django.http import JsonResponse
from django.middleware.csrf import get_token

from feedback.models import FeedbackInfo

def message(request):
    if request.method == 'GET':
        csrf_token = get_token(request)
        response = JsonResponse({'CSRFToken': csrf_token})
        response.set_cookie('csrftoken', csrf_token)
        return response    


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
        
