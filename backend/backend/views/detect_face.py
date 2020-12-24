import dlib
import os.path
from .utils import LEFT_FACE, CENTER_FACE, RIGHT_FACE, NO_FACE
import cv2
import math
import numpy as np

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


def find_main_face(dets):
    result = 0
    max_width = 0
    for i, d in enumerate(dets):
        if max_width < d.right() - d.left():
            max_width = d.right() - d.left()
            result = i
    return result


def pose_estimation(pt2d, pt3d):
    # 参照论文Optimum Fiducials Under Weak Perspective Projection，使用弱透视投影
    # 减均值，排除t，便于求出R
    # minus mean value of all point so that t=0, we can calculate pure R
    pt2dm = np.zeros(pt2d.shape)
    pt3dm = np.zeros(pt3d.shape)
    pt2dm[0, :] = pt2d[0, :]-np.mean(pt2d[0, :])
    pt2dm[1, :] = pt2d[1, :]-np.mean(pt2d[1, :])
    pt3dm[0, :] = pt3d[0, :]-np.mean(pt3d[0, :])
    pt3dm[1, :] = pt3d[1, :]-np.mean(pt3d[1, :])
    pt3dm[2, :] = pt3d[2, :]-np.mean(pt3d[2, :])
    # 最小二乘方法计算R
    # Calculate R using least squares algorithm
    R1 = np.dot(np.dot(np.mat(np.dot(pt3dm, pt3dm.T)).I, pt3dm), pt2dm[0, :].T)
    R2 = np.dot(np.dot(np.mat(np.dot(pt3dm, pt3dm.T)).I, pt3dm), pt2dm[1, :].T)
    # 计算出f
    # calculate alpha (is f in this code)
    f = (math.sqrt(R1[0, 0]**2+R1[0, 1]**2+R1[0, 2]**2) +
         math.sqrt(R2[0, 0]**2+R2[0, 1]**2+R2[0, 2]**2))/2
    R1 = R1/f
    R2 = R2/f
    R3 = np.cross(R1, R2)
    # SVD 分解，重构 _ is s
    U, _, V = np.linalg.svd(np.concatenate(
        (R1, R2, R3), axis=0), full_matrices=True)
    R = np.dot(U, V)
    R1 = R[0, :]
    R2 = R[1, :]
    R3 = R[2, :]
    # 使用旋转矩阵R恢复出旋转角度
    phi = math.atan(R2[0, 2]/R3[0, 2])
    gamma = math.atan(-R1[0, 2]/(math.sqrt(R1[0, 0]**2+R1[0, 1]**2)))
    theta = math.atan(R1[0, 1]/R1[0, 0])
    # 使用R重新计算旋转平移矩阵，求出t
    # pt3d = np.row_stack((pt3d, np.ones((1, pt3d.shape[1]))))
    # R1_orig = np.dot(np.dot(np.mat(np.dot(pt3d, pt3d.T)).I, pt3d), pt2d[0, :].T)
    # R2_orig = np.dot(np.dot(np.mat(np.dot(pt3d, pt3d.T)).I, pt3d), pt2d[1, :].T)

    # t3d = np.array([R1_orig[0, 3], R2_orig[0, 3], 0]).reshape((3, 1))
    return(phi, gamma, theta)


def get_pose_estimation(pt2d):
    left_vis = np.concatenate(
        (np.arange(9), np.arange(31)+17, np.array([48, 60, 64, 54])))
    right_vis = np.concatenate(
        (np.arange(9)+8, np.arange(31)+17, np.array([48, 60, 64, 54])))

    pt3d = np.load("pt3d.npy")
    phil, gammal, thetal = pose_estimation(
        pt2d[:, left_vis], pt3d[:, left_vis])
    phir, gammar, thetar = pose_estimation(
        pt2d[:, right_vis], pt3d[:, right_vis])
    if abs(gammal) > abs(gammar):
        phi = phil
        gamma = gammal
        theta = thetal
    else:
        phi = phir
        gamma = gammar
        theta = thetar
    return(phi, gamma, theta)


# pitch 低头，yaw 摇头
def get_cv_face(yaw):
    global default_yaw

    # 修正 defalut_yaw
    if -6 < default_yaw - yaw < 6:
        default_yaw = default_yaw * 0.9 + yaw * 0.1

    yaw -= default_yaw

    # print("default:{}, yaw:{}".format(default_yaw, yaw))
    if -8 < yaw < 8:
        return CENTER_FACE
    elif yaw > 12:
        return LEFT_FACE
    elif yaw < -12:
        return RIGHT_FACE
    else:
        return NO_FACE


def shape_to_np(shape):
    xy = []
    for i in range(68):
        xy.append((shape.part(i).x, shape.part(i).y,))
    xy = np.asarray(xy, dtype='float32')
    return xy


def detect_face(img):
    global detector
    global predictor
    global win
    global default_yaw
    # 绘制图片
    if debug__:
        win.clear_overlay()
        win.set_image(img)
    # 使用detector进行人脸检测 dets为返回的结果
    dets = detector(img, 1)
    # 可以获取比较全面的信息，如获取人脸与detector的匹配程度
    # dets, scores, idx = detector.run(img, 1)

    # 没识别到人脸就算了
    if len(dets) == 0:
        return NO_FACE

    main_face = dets[find_main_face(dets)]

    # 使用predictor进行人脸关键点识别，shape 为返回的结果
    shape = predictor(img, main_face)
    lmark = shape_to_np(shape)
    lmark = lmark[:, :].T
    _, gamma, _ = get_pose_estimation(lmark)

    # 绘制特征点和人脸框
    if debug__:
        win.add_overlay(shape)
        win.add_overlay(dets)
        print("-_-!!", np.array(gamma)*180/math.pi, default_yaw)
    return get_cv_face(gamma * 180 / math.pi)
