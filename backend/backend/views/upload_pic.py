from django.shortcuts import HttpResponse
import random
from .base import allow_acess
import base64
from io import BytesIO
from skimage import io
from .detect_face import detect_face

last_result = 1

def base64_to_image(base64_str):
    base64_data = base64_str[23:] + "=="
    byte_data = base64.b64decode(base64_data)
    image_data = BytesIO(byte_data)
    img = io.imread(image_data)
    return img

def upload_pic(request):
	global last_result
	# address = request.POST.get("address")
	head = ""
	content = ""

	for x in request.POST:
		if x.startswith("data"):
			head = x
		if x.startswith("base"):
			content = x.replace(" ", "+")

	encoded = head + ";" + content  
	result= 1
	tmp = detect_face(base64_to_image(encoded))
	if tmp != -1:
		if last_result == 1:
			result = tmp
		last_result = tmp
	return allow_acess(HttpResponse(str(result)))
