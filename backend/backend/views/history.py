import pickle
import os
from .base import allow_acess
from django.http import HttpResponse, JsonResponse


def read_hist():
    hist_file = "hist.pkl"
    hist = []
    if os.path.exists(hist_file):
        with open(hist_file, "rb") as fil:
            hist = pickle.load(fil)
    return hist


def save_hist(hist):
    hist_file = "hist.pkl"

    with open(hist_file, "wb") as fil:
        pickle.dump(hist, fil)


def historyall(request):
    hist = read_hist()
    ret = [{"name": x["name"], "img": x["imgs"][0]} for x in hist]
    return allow_acess(JsonResponse({"files": ret}))


def historyfile(request):

    flag = "get"
    name = None
    if request.GET.get("name"):
        flag = "get"
        name = request.GET.get("name")

    elif request.GET.get("delete_name"):
        flag = "del"
        name = request.GET.get("delete_name")

    hist = read_hist()

    ret = None
    for x in hist:
        if x["name"] == req_name:
            ret = x
            break
    if ret is None:
        ret = {"imgs": []}
    return allow_acess(JsonResponse({"imgs": ret["imgs"]}))
