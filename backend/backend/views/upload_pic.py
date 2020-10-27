from django.shortcuts import HttpResponse
from PIL import Image
import numpy as np
import random
from .base import allow_acess
import pdb
import re
import base64
from io import BytesIO
import os
import time
 
 
def base64_to_image(base64_str, image_path):
	# base64_data = re.sub('^data:image/.+;base64,', '', base64_str)
	base64_data = base64_str[23:] + "=="

	byte_data   = base64.b64decode(base64_data)
	image_data  = BytesIO(byte_data)
	img 		= Image.open(image_data)
	img.save(image_path)

def upload_pic(request):

	head = None
	content = None

	for x in request.POST:
		if x.startswith("data"):
			head = x
		if x.startswith("base"):
			content = x.replace(" " , "+")

	encoded = head + ";" + content

	# print (head + ";" + content)
	file_name = str(int(time.time() * 1000)) + ".jpg"
	save_dir = "./faces"
	os.makedirs(save_dir , exist_ok = True)
	base64_to_image(encoded , os.path.join(save_dir , file_name))


	result = random.randint(0,2)
	return allow_acess(HttpResponse(str(result)))