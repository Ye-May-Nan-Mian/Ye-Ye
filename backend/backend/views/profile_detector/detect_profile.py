import cv2
import imutils
import numpy as np
from .utils import LEFT_FACE, RIGHT_FACE, NO_FACE

predictor_path = 'haarcascade_profileface.xml'


def detect(img, cascade):
    rects, _, _ = cascade.detectMultiScale3(img, scaleFactor=1.3, minNeighbors=4, minSize=(30, 30),
                                            flags=cv2.CASCADE_SCALE_IMAGE, outputRejectLevels=True)
    #rects = cascade.detectMultiScale(img,minNeighbors=10, scaleFactor=1.05)
    if len(rects) == 0:
        return ()
    rects[:, 2:] += rects[:, :2]
    return rects


class detect_face_orientation():
    def __init__(self):
        # crear el detector de perfil rostros
        self.detect_perfil_face = cv2.CascadeClassifier(predictor_path)

    def face_orientation(self, gray):
        # left_face
        box_left = detect(gray, self.detect_perfil_face)
        (left_result, right_result) = (NO_FACE, NO_FACE)
        if len(box_left):
            left_result = LEFT_FACE
        # right_face
        gray_flipped = cv2.flip(gray, 1)
        box_right = detect(gray_flipped, self.detect_perfil_face)
        if len(box_right):
            right_result = RIGHT_FACE
        if left_result == LEFT_FACE and right_result == NO_FACE:
            return LEFT_FACE
        elif left_result == NO_FACE and right_result == RIGHT_FACE:
            return RIGHT_FACE
        else:
            return NO_FACE


# instanciar detector
detector = detect_face_orientation()


def detect_profile(frame):
    # frame = imutils.resize(frame, width=720)
    # -------------------------- Insertar preproceso -------------------------------------
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # detectar si hay un rostro frontal o de perfil
    result = detector.face_orientation(gray)
    return result
