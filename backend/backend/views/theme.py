import pickle
import os
from .base import allow_acess
from django.http import HttpResponse, JsonResponse

def theme(request):

    print (request.GET)

    if request.GET.get("post_themes"):
        themes = request.GET.get("post_themes")

        with open("themes.pkl" , "wb") as fil:
            pickle.dump(themes , fil)

        return allow_acess(JsonResponse({}))
    
    # else no param

    if not os.path.exists("themes.pkl"):
        return allow_acess(JsonResponse({"themes" : ""}))

    with open("themes.pkl" , "rb") as fil:
        themes = pickle.load(fil)

    return allow_acess(JsonResponse({"themes" : themes}))



