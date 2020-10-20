from django.shortcuts import HttpResponse
import os.path as path
import os
import matplotlib.pyplot as plt
from .base import allow_acess

idx = 0
save_folder = "../file_pict"

def upload_file(request):
	global idx

	print (request.POST)

	address = request.POST.get("address")

	print ("I've got the address %s" % address)

	# os.makedirs(save_folder , exist_ok = True)
	# 
	# save_address = path.join("../frontend/file_pict" , str(idx) + ".jpg")
	# plt.figure(figsize = (32 , 32))
	# plt.title(str(idx))
	# 
	# plt.savefig(save_address)

	return allow_acess(HttpResponse("1"))



