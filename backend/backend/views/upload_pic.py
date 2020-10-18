from django.shortcuts import HttpResponse
from PIL import Image
import numpy as np
import random

def upload_pic(request):
	address = request.POST.get("address")

	img = Image.open(address)
	img = np.array(img)

	result = random.randint(0,2)

	return HttpResponse(str(result))