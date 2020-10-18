import django
from django.shortcuts import HttpResponse
from .upload_file import upload_file
from .upload_pic import upload_pic
from .base import allow_acess

def get_csrf(request):
	token = django.middleware.csrf.get_token(request)

	return allow_acess(HttpResponse(str(token)))
