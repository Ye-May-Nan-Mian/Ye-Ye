from django.shortcuts import HttpResponse
import os.path as path
import os
import matplotlib.pyplot as plt
import o

idx = 0
save_folder = "../file_pict"

def upload_file(request):
	global idx

	address = request.GET.get("address")

	os.makedirs(save_folder , exist_ok = True)

	save_address = path.join("../file_pict" , str(idx) + ".jpg")
	plt.figure(figsize = (32 , 32))
	plt.title(str(idx))

	plt.savefig(save_address)

	return HttpResponse("1")



