from django.shortcuts import HttpResponse
from PIL import Image
import numpy as np
import random
from .base import allow_acess
import pdb

def upload_pic(request):
	address = request.POST.get("address")

	# pdb.set_trace()
	# print (request.POST)
	# img = Image.open(address)
	# img = np.array(img)

	head = None
	content = None

	for x in request.POST:
		if x.startswith("data"):
			head = x
		if x.startswith("base"):
			content = x.replace(" " , "+")

	if head is not None and content is not None:
		print ("I've got the image!")

	result = random.randint(0,2)
	return allow_acess(HttpResponse(str(result)))