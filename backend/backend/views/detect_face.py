import dlib
import os.path
from .utils import *
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


def find_main_face(dets):
    result = 0
    max_width = 0
    for i, d in enumerate(dets):
        if max_width < d.right() - d.left():
            max_width = d.right() - d.left()
            result = i
    return result


def get_ratio_face(main_face, shape):
    # 返回比例
    ratio = ((shape.part(30).x + shape.part(33).x)/2.0 -
             main_face.left()) / (main_face.right() - main_face.left())

    # print(ratio)
    if ratio < 0.43:
        return LEFT_FACE
    elif ratio > 0.57:
        return RIGHT_FACE
    elif 0.48 < ratio < 0.52:
        return CENTER_FACE
    return NO_FACE


# 从dlib的检测结果抽取姿态估计需要的点坐标
def get_image_points_from_landmark_shape(landmark_shape):
    # 2D image points. If you change the image, you need to change vector
    image_points = np.array([
        # Nose tip
        (landmark_shape.part(30).x, landmark_shape.part(30).y),
        # Chin
        (landmark_shape.part(8).x, landmark_shape.part(8).y),
        # Left eye left corner
        (landmark_shape.part(36).x, landmark_shape.part(36).y),
        # Right eye right corne
        (landmark_shape.part(45).x, landmark_shape.part(45).y),
        # Left Mouth corner
        (landmark_shape.part(48).x, landmark_shape.part(48).y),
        # Right mouth corner
        (landmark_shape.part(54).x, landmark_shape.part(54).y)
    ], dtype="double")

    return image_points


# 从旋转向量转换为欧拉角
def get_euler_angle(rotation_vector):
    # calculate rotation angles
    theta = cv2.norm(rotation_vector, cv2.NORM_L2)

    # transformed to quaterniond
    w = math.cos(theta / 2)
    x = math.sin(theta / 2) * rotation_vector[0][0] / theta
    y = math.sin(theta / 2) * rotation_vector[1][0] / theta
    z = math.sin(theta / 2) * rotation_vector[2][0] / theta

    ysqr = y * y
    # pitch (x-axis rotation)
    t0 = 2.0 * (w * x + y * z)
    t1 = 1.0 - 2.0 * (x * x + ysqr)
    # print('t0:{}, t1:{}'.format(t0, t1))
    pitch = math.atan2(t0, t1)

    # yaw (y-axis rotation)
    t2 = 2.0 * (w * y - z * x)
    if t2 > 1.0:
        t2 = 1.0
    if t2 < -1.0:
        t2 = -1.0
    yaw = math.asin(t2)

    # roll (z-axis rotation)
    t3 = 2.0 * (w * z + x * y)
    t4 = 1.0 - 2.0 * (ysqr + z * z)
    roll = math.atan2(t3, t4)

    # print('pitch:{}, yaw:{}, roll:{}'.format(pitch, yaw, roll))

    # 单位转换：将弧度转换为度
    Y = int((pitch/math.pi)*180)
    X = int((yaw/math.pi)*180)
    Z = int((roll/math.pi)*180)

    return Y, X, Z

# 获取旋转向量和平移向量


def get_pose_estimation(image_points):
    # 3D model points.
    # TODO：这个研究一下
    model_points = np.array([
        (0.0, 0.0, 0.0),           # Nose tip
        (0.0, -330.0, -65.0),      # Chin
        (-225.0, 170.0, -135.0),   # Left eye left corner
        (225.0, 170.0, -135.0),    # Right eye right corne
        (-150.0, -150.0, -125.0),  # Left Mouth corner
        (150.0, -150.0, -125.0)    # Right mouth corner
    ])

    # Camera internals
    img_size = (300, 300)
    focal_length = img_size[1]
    center = (img_size[1]/2, img_size[0]/2)
    camera_matrix = np.array(
        [[focal_length, 0, center[0]],
         [0, focal_length, center[1]],
         [0, 0, 1]], dtype="double")

    dist_coeffs = np.zeros((4, 1))  # Assuming no lens distortion
    (success, rotation_vector, translation_vector) = cv2.solvePnP(model_points,
                                                                  image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE)

    # pitch 是上下摇头，上：(140) < pitch < 180；下：(-160) > pitch > -180
    # yaw 是左右摇头，左：(-40) < yaw < 0；右：0 < yaw < (40)
    # roll 是旋转头，没用处
    pitch, yaw, roll = get_euler_angle(rotation_vector)
    # euler_angle_str = 'Y:{}, X:{}, Z:{}'.format(pitch, yaw, roll)
    # print(pitch)
    return pitch, yaw


def get_cv_face(shape):
    global default_yaw
    pitch, yaw = get_pose_estimation(
        get_image_points_from_landmark_shape(shape))

    # 修正 defalut_yaw
    if -10 < default_yaw - yaw < 10:
        default_yaw = default_yaw * 0.9 + yaw * 0.1

    # 低头
    if -175 < pitch < 0:
        print(DOWN_FACE)
        return DOWN_FACE

    yaw -= default_yaw

    # print("default:{}, yaw:{}".format(default_yaw, yaw))
    if yaw > 20:
        return LEFT_FACE
    elif yaw < -20:
        return RIGHT_FACE
    elif -10 < yaw < 10:
        return CENTER_FACE
    else:
        return NO_FACE
    return


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
    # 可以获取比较全面的信息，如获取人脸与detector的匹配程度
    # dets, scores, idx = detector.run(img, 1)

    # 没识别到人脸就算了
    if len(dets) == 0:
        return NO_FACE

    main_face = dets[find_main_face(dets)]

    # 使用predictor进行人脸关键点识别，shape 为返回的结果
    shape = predictor(img, main_face)

    # 绘制特征点和人脸框
    if debug__:
        win.add_overlay(shape)
        win.add_overlay(dets)
    return get_cv_face(shape)

    # return get_ratio_face(main_face, shape)
