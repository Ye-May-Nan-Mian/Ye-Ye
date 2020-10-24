from django.shortcuts import HttpResponse
import os.path as P
import os
import matplotlib.pyplot as plt
from .base import allow_acess
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import shutil
import sys, fitz
import pdb

idx = 0
save_folder = "../frontend/src/file_pict/"

def pdf2image(pdf_path, image_folder):

	for files in os.listdir(save_folder):
		os.remove(os.path.join(save_folder, files))

	pdf_file = fitz.open(pdf_path)
	for page_idx in range(pdf_file.pageCount):
		page = pdf_file[page_idx]

		# 默认大小：(792 , 612)，放缩后：(1056 , 816)
		mat = fitz.Matrix(1.33, 1.33).preRotate(0)
		pix = page.getPixmap(matrix = mat, alpha = False)
		
		img_name = "%d.png" % page_idx
				
		pix.writePNG(img_name)#将图片写入指定的文件夹内
		shutil.move(img_name , P.abspath(image_folder))
		

def upload_file(request):
	global idx

	files = request.FILES.getlist("file", None)
	file_path = default_storage.save("_.pdf", ContentFile(files[0].read()))

	pdf2image(file_path , save_folder)
	print (file_path)

	os.remove(file_path)

	print ("pdf saved!")

	return allow_acess(HttpResponse("1"))



