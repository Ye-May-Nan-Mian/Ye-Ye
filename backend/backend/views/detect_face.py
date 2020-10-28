import dlib
import os.path

debug__ = True

predictor_path = os.path.abspath(
    "../ml") + "/shape_predictor_68_face_landmarks.dat"
# 使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()
# 使用官方提供的模型构建特征提取器
predictor = dlib.shape_predictor(predictor_path)
# 使用dlib提供的图片窗口
win = None
if debug__:
    win = dlib.image_window()

def find_main_face(dets):
    result = 0
    max_width = 0
    for i, d in enumerate(dets):
        if max_width < d.right() - d.left():
            max_width = d.right() - d.left()
            result = i
    return result

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
        return -1

    # 53--(48)--101---(81)---182    3:5
    main_face = dets[find_main_face(dets)]

    # 使用predictor进行人脸关键点识别，shape 为返回的结果
    shape = predictor(img, main_face)
    nose = shape.part(30)    
    # 获取鼻子中心的坐标
    # print("Detection {}, Part {}: {}".format(main_face, 30, nose))
    if nose.x * 26 <= main_face.left() * 15 + main_face.right() * 11: 
        return 0
    elif nose.x * 26 >= main_face.left() * 11 + main_face.right() * 15:
        return 2

    # 绘制特征点
    if debug__:
        win.add_overlay(shape)

    # 绘制人脸框
    if debug__:
        win.add_overlay(dets)
    return 1
