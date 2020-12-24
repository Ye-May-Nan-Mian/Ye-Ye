from django.shortcuts import HttpResponse
from .base import allow_acess
import base64
from io import BytesIO
from skimage import io
from .detect_face import detect_face
import time
import threading
from .utils import CENTER_FACE, NO_FACE, next_state, next_result

last_state = 9
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


def get_result(detect):
    global last_state
    global last_time
    global next_state
    global next_result
    global R
    result = CENTER_FACE
    current = time.time()
    R.acquire()
    if current > last_time:
        last_time = current
        result = next_result[last_state][detect]
        last_state = next_state[last_state][detect]
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
    # result: 0 left, 1 center, 2 right
    result = CENTER_FACE
    if img is not None:
        detect = detect_face(img)
        result = get_result(detect)
    return allow_acess(HttpResponse(str(result)))
