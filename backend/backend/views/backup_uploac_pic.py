from django.shortcuts import HttpResponse
import random
from .base import allow_acess
import base64
from io import BytesIO
from skimage import io
from .detect_face import detect_face
import time
import threading

last_result = 1
time_tramp = []
results = []
last_time = -1
R = threading.Lock()


def base64_to_image(base64_str):
	base64_data = base64_str[23:] + "=="
	byte_data = base64.b64decode(base64_data)
	image_data = BytesIO(byte_data)
	img = io.imread(image_data)
	return img


def check(angel, last):
	constant = 0.05
	k = 0
	tot = 0
	for i, p in enumerate(angel):
		if k == i:
			continue
		if last == 0:
			t = max(angel[k:i])-p
		else:
			t = p-min(angel[k:i])
		if t >= constant:
			last = 1-last
			k = i
			tot += 1
	# print(angel, tot)
	return tot


def upload_pic(request):
	global time_tramp
	global results
	global last_time
	# address = request.POST.get("address")
	head = ""
	content = ""

	for x in request.POST:
		if x.startswith("data"):
			head = x
		elif x.startswith("base"):
			content = x.replace(" ", "+")

	encoded = head + ";" + content
	result = 1
	# tmp = detect_face(base64_to_image(encoded))
	current = time.time()
	detect = detect_face(base64_to_image(encoded))
	if detect == -1:
		return allow_acess(HttpResponse("1"))
	print(detect)
	R.acquire()
	time_tramp.append([current, detect])
	if current-last_time > 0.5:
		last_time = current
		while len(time_tramp) > 0 and current-time_tramp[0][0] > 3:
			del time_tramp[0]
		angel = [x[1] for x in time_tramp]
		t0 = check(angel, 0)
		t1 = check(angel, 1)
		if t0 > t1 and t0 >= 4:
			result = 0
		if t0 < t1 and t1 >= 4:
			result = 2
		# for i, t in enumerate(time_tramp):
		# 	if current-t[0] < 0.3:
		# 		continue
		# 	if t[1] == 0 or t[1] == 2:
		# 		check_z = False
		# 		for j in range(i, len(time_tramp)):
		# 			if time_tramp[j][1] == 1:
		# 				check_z = True
		# 			elif check_z == True and time_tramp[j][1] == time_tramp[i][1]:
		# 				result = time_tramp[i][1]
		# 				break
		# 	if result!=1: break
		if result != 1:
			time_tramp.clear()
	# if tmp != -1:
	# 	if last_result == 1:
	# 		result = tmp
	# 	last_result = tmp
	R.release()
	return allow_acess(HttpResponse(str(result)))
