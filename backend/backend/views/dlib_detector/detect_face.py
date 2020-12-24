import dlib
import os.path
from .utils import NO_FACE, CENTER_FACE
# 使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()


def detect_face(img):
    global detector
    global win
    # 使用detector进行人脸检测 dets为返回的结果
    dets = detector(img, 1)

    # 没识别到人脸
    if len(dets) == 0:
        return NO_FACE
    else:
        return CENTER_FACE
