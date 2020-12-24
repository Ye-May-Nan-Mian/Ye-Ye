from django.http import HttpResponse, JsonResponse
import os.path as P
import os
from .base import allow_acess, FrontendError
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import fitz
import pdb
import base64
from .history import read_hist, save_hist
import random

idx = 0


def pdf2image(pdf_path):

    res = []
    pdf_file = fitz.open(pdf_path)
    for page_idx in range(pdf_file.pageCount):
        page = pdf_file[page_idx]

        # 默认大小：(792 , 612)，放缩后：(1056 , 816)
        mat = fitz.Matrix(1.33, 1.33).preRotate(0)
        pix = page.getPixmap(matrix=mat, alpha=False)

        pix.writePNG("_.png")  # 将图片写入指定的文件夹内

        with open("_.png", "rb") as fil:
            b64 = base64.b64encode(fil.read())

        b64 = "data:image/png;base64," + str(b64)[2:-1]
        res.append(b64)
    return res


def img2image(path, type):

    with open(path, "rb") as f:
        b64 = base64.b64encode(f.read())
    b64 = "data:image/{0};base64,{1}".format(type, str(b64)[2:-1])

    return [b64]


def upload_file(request):
    global idx

    files = request.FILES.getlist("file", None)
    if files is None:
        raise FrontendError("not file get FILES.")

    imgs = []
    name = None
    for file in files:

        filename = str(file)
        if name == None:
            name = filename
        file_path = default_storage.save(filename, ContentFile(file.read()))

        if filename.endswith(".pdf"):
            imgs += pdf2image(file_path)
        elif filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".jpeg"):
            if filename.endswith(".jpg"):
                type = "jpg"
            elif filename.endswith(".png"):
                type = "png"
            elif filename.endswith(".jpeg"):
                type = "jpeg"

            imgs += img2image(file_path, type)
        else:  # do nothing
            pass

        os.remove(file_path)

    if len(files) > 1:
        name = name + " 等"

    hist = read_hist()
    hist.append({
        "name": name,
        "imgs": imgs,
        "idx": random.randint(0, 2333333),
    })
    hist = hist[-10:]
    save_hist(hist)

    return allow_acess(JsonResponse({"imgs": imgs}))
