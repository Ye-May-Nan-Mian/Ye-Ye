import django
from .upload_file import upload_file
from .upload_pic import upload_pic
from .base import allow_acess
from .history import historyall
from django.http import HttpResponse , JsonResponse

def get_csrf(request):
	token = django.middleware.csrf.get_token(request)

	return allow_acess(HttpResponse(str(token)))
