import threading
import time
from .dlib_detector import detect_face, CENTER_FACE, NO_FACE, next_face, next_result
from .profile_detector import detect_profile
from skimage import io
from io import BytesIO
import base64
from .base import allow_acess
from django.shortcuts import HttpResponse
import numpy as np

last_face = NO_FACE
last_time = 0.0
R = threading.Lock()


def base64_to_image(base64_str):
    base64_data = base64_str[23:] + "=="
    byte_data = base64.b64decode(base64_data)
    image_data = BytesIO(byte_data)
    img = None
    try:
        img = io.imread(image_data)
    except:
        return None
    return img


def get_result(img):
    global last_face
    global last_time
    global R
    global next_result
    global next_face
    result = CENTER_FACE

    detect = detect_face(img)
    if detect == NO_FACE:
        detect = detect_profile(img)

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
    head = ""
    content = ""

    for x in request.POST:
        if x.startswith("data"):
            head = x
        elif x.startswith("base"):
            content = x.replace(" ", "+")

    encoded = head + ";" + content
    img = base64_to_image(encoded)
    result = CENTER_FACE
    if img is not None:
        result = get_result(img)

    return allow_acess(HttpResponse(str(result)))
