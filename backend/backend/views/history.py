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

    ret = [{
        "name": x["name"] , 
        "img" : None if len(x["imgs"]) == 0 else x["imgs"][0] , 
        "idx" : x["idx" ] , 
    } for x in hist]

    return allow_acess(JsonResponse({"files": ret}))


def historyfile(request):

    flag = "get"
    idx = None
    if request.GET.get("idx"):
        flag = "get"
        idx = request.GET.get("idx")

    elif request.GET.get("delete_idx"):
        flag = "del"
        idx = request.GET.get("delete_idx")

    hist = read_hist()
    
    if flag == "get":
        ret = [x for x in hist if int(x["idx"]) == int(idx)]
        if len(ret) == 0:
            ret = None
        else:
            ret = ret[0]["imgs"]
        return allow_acess(JsonResponse({"imgs": ret}))

    # else if flag == "del"

    to_del_pos = [i for i in range(len(hist)) if int(hist[i]["idx"]) == int(idx)]

    if len(to_del_pos) > 0:
        x = to_del_pos[0]
        hist.pop(x)

    save_hist(hist)

    return allow_acess(JsonResponse({}))
