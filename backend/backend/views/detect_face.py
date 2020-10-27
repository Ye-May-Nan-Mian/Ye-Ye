import dlib
import os.path

predictor_path = os.path.abspath(
    "../ml") + "/shape_predictor_68_face_landmarks.dat"
# 使用dlib自带的frontal_face_detector作为我们的特征提取器
detector = dlib.get_frontal_face_detector()
# 使用官方提供的模型构建特征提取器
predictor = dlib.shape_predictor(predictor_path)
# 使用dlib提供的图片窗口
win = dlib.image_window()


def detect_face(img):
    # 绘制图片
    win.clear_overlay()
    win.set_image(img)

    # 使用detector进行人脸检测 dets为返回的结果
    dets = detector(img, 1)

    # dets的元素个数即为脸的个数
    print("Number of faces detected: {}".format(len(dets)))

    # 可以获取比较全面的信息，如获取人脸与detector的匹配程度
    dets, scores, idx = detector.run(img, 1)
    for i, d in enumerate(dets):
        print("Detection {}, dets{},score: {}, face_type:{}".format(
            i, d, scores[i], idx[i]))

        # 使用predictor进行人脸关键点识别 shape为返回的结果
        shape = predictor(img, d)

        # 获取第一个和第二个点的坐标（相对于图片而不是框出来的人脸）
        # print("Part 0: {}, Part 1: {} ...".format(
        #     shape.part(0),  shape.part(1)))

        # 绘制特征点
        win.add_overlay(shape)

    # 绘制人脸框
    win.add_overlay(dets)
    return
