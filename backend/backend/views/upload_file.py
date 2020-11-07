# -*- mode: python ; coding: utf-8 -*-

from django.http import HttpResponse , JsonResponse
import os.path as P
import os
# import matplotlib.pyplot as plt
from .base import allow_acess
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import sys
import fitz
import pdb
import base64

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

        with open("_.png" , "rb") as fil:
            b64 = base64.b64encode(fil.read())

        b64 = "data:image/png;base64," + str(b64)[2:-1]
        res.append(b64)
    return res

def upload_file(request):
    global idx

    files = request.FILES.getlist("file", None)
    file_path = default_storage.save("_.pdf", ContentFile(files[0].read()))

    print ("start!")
    imgs = pdf2image(file_path)
    print(file_path)

    os.remove(file_path)

    print("pdf saved!")

    return allow_acess(JsonResponse({"imgs" : imgs}))

