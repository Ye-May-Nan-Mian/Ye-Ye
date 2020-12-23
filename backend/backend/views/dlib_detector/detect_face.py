import dlib
import os.path
from .utils import NO_FACE, CENTER_FACE
import cv2
import math


# 这个开关人脸标记
debug__ = False

predictor_path = "shape_predictor_68_face_landmarks.dat"
# 使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()
# 使用官方提供的模型构建特征提取器
predictor = dlib.shape_predictor(predictor_path)
# 使用dlib提供的图片窗口
win = None
if debug__:
    win = dlib.image_window()

# 记录默认状态时的摇头角度
default_yaw = 0


def detect_face(img):
    global detector
    global predictor
    global win
    # 绘制图片
    if debug__:
        win.clear_overlay()
        win.set_image(img)
    # 使用detector进行人脸检测 dets为返回的结果
    dets = detector(img, 1)

    # 绘制特征点和人脸框
    if debug__:
        win.add_overlay(dets)

    # 没识别到人脸
    if len(dets) == 0:
        return NO_FACE
    else:
        return CENTER_FACE
