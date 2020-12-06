import pickle
import os
from .base import allow_acess
from django.http import HttpResponse , JsonResponse


def read_hist():
	hist_file = "hist.pkl"
	hist = []
	if os.path.exists(hist_file):
		with open(hist_file , "rb") as fil:
			hist = pickle.load(fil)
	return hist

def save_hist(hist):
	hist_file = "hist.pkl"
	with open(hist_file , "wb") as fil:
		pickle.dump(hist , fil)

def historyall(request):
	hist = read_hist()
	ret = [ {"name" : x["name"] , "img" : x["img"][0]} for x in hist ]
	return allow_acess(JsonResponse({"files" : ret}))

def historyfile(request):

	req_name = request.GET["name"]

	hist = read_hist()
	ret = None
	for x in hist:
		if x["name"] == req_name:
			ret = x
			break
	return allow_acess(JsonResponse({"imgs" : ret["img"]}))
