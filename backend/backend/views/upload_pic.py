from django.shortcuts import HttpResponse
import random
from .base import allow_acess
import base64
from io import BytesIO
from skimage import io
from .detect_face import detect_face
import time
import threading
from .utils import *

last_face = CENTER_FACE
last_time = 0.0
R = threading.Lock()


def base64_to_image(base64_str):
    base64_data = base64_str[23:] + "=="
    byte_data = base64.b64decode(base64_data)
    image_data = BytesIO(byte_data)
    img = io.imread(image_data)
    return img


def get_result(detect):
    global last_face
    global last_time
    global next_face
    global next_result
    global R
    result = CENTER_FACE
    current = time.time()
    R.acquire()
    if current > last_time:
        # print(detect)
        last_time = current
        result = next_result[last_face][detect]
        last_face = next_face[last_face][detect]
    R.release()
    return result


def upload_pic(request):
    # address = request.POST.get("address")
    head = ""
    content = ""

    for x in request.POST:
        if x.startswith("data"):
            head = x
        elif x.startswith("base"):
            content = x.replace(" ", "+")

    encoded = head + ";" + content
    detect = detect_face(base64_to_image(encoded))
    result = get_result(detect)
    return allow_acess(HttpResponse(str(result)))
