# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import cv2 as cv
import cv2
from skimage import io
import time
import pyautogui

LEFT_EYE=0
RIGHT_EYE=1
SAME_EYE=2

Not_changed=1
Pagedown=0
Pageup=2


fd = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
ed = cv.CascadeClassifier('haarcascade_eye_tree_eyeglasses.xml')
ed_left = cv2.CascadeClassifier('haarcascade_lefteye_2splits.xml')
ed_right = cv2.CascadeClassifier('haarcascade_righteye_2splits.xml')

def get_eye_shrink(frame):
    # frame=cv2.flip(frame,1,dst=None)
    frame = cv2.convertScaleAbs(frame,alpha=1.5,beta=50)
    faces = fd.detectMultiScale(frame, 1.3, 5)
    eyes_left=[]
    eyes_right=[]
    eyes_base=[]
    eyes=[]
    for l, t, w, h in faces:
        a, b = int(w / 2), int(h / 2) 
        cv.ellipse(frame, (l+a, t+b), (a, b), 0, 0, 360, (255, 0, 255), 2)
        face = frame[t:t+h, l:l+w] 
        eyes = ed.detectMultiScale(face, 1.3, 3,4)
        # if len(eyes)!=1: return SAME_EYE

        eyes_left = ed_left.detectMultiScale(face, 1.3, 3,4)
        # face_right=cv2.flip(face,1,dst=None)
        eyes_right = ed_right.detectMultiScale(face, 1.3, 3,4)

    cv.imshow('open eyes!!', frame)
    if len(eyes)!=1: return SAME_EYE
    tmp=[]
    for eyes_base in [eyes_left,eyes_right]:
        for t in eyes_base:
            tmp.append(t[0])
            if abs(t[0]-eyes[0][0])>20:
                if t[0]<eyes[0][0]: 
                    return LEFT_EYE
                else: 
                    return RIGHT_EYE
    # print(eyes[0][0],tmp)
    return SAME_EYE

def test():
    # 哈尔级联分类器
    fd = cv.CascadeClassifier('haarcascade_frontalface_alt.xml')
    ed = cv.CascadeClassifier('haarcascade_eye_tree_eyeglasses.xml')
    # ed = cv.CascadeClassifier('haarcascade_eye.xml')
    # ed = cv.CascadeClassifier('haarcascade_righteye_2splits.xml')
    # ed = cv2.CascadeClassifier('haarcascade_lefteye_2splits.xml')
    vc = cv.VideoCapture(0)
    # print(vc.get(4),'*',vc.get(3))
    vc.set(4,500) # 分辨率 宽
    vc.set(3,600) # 分辨率 长
    vc.set(5,3)   # 帧数
    vc.set(10,1)
    print(vc.get(10))

    while True:
        frame = vc.read()[1]
        frame = cv2.convertScaleAbs(frame,alpha=1,beta=0)
        eyes=[]    
        faces = fd.detectMultiScale(frame, 1.3, 3,4) 
        for l, t, w, h in faces:
            a, b = int(w / 2), int(h / 2) 
            cv.ellipse(frame, (l+a, t+b), (a, b), 0, 0, 360, (255, 0, 255), 2)
            face = frame[t:t+h, l:l+w] 
            eyes = ed.detectMultiScale(face, 1.3, 3,4)

            for l, t, w, h in eyes:
                a, b = int(w / 2), int(h / 2)
                cv.ellipse(face, (l+a, t+b), (a, b), 0,0, 360, (0, 255, 0), 2)
        
        if len(eyes)==2: print(eyes[0][0],eyes[1][1])
        elif len(eyes)==1: print(eyes[0][0])
        print(len(eyes))
        cv.imshow('open eyes!!', frame)
        if cv.waitKey(1) == ord(' '):
            break 
    vc.release()
    cv.destroyAllWindows()

def update(eye_state):

    time_GAP=0.8

    result = Not_changed
    current = time.time()
    record.append((current,eye_state))
    if current-record[0][0]<time_GAP: # 若记录内总时间不足则跳过
        return result
    if eye_state=='NOT_CENTER':
        record.clear()
    else:
        tmp_sum=[0]*3
        for x in record:
            if current-x[0]>time_GAP: # 移除大于GAPs之前的数据
                record.remove(x)
            else:
                if x[1]==LEFT_EYE: tmp_sum[0]+=1
                elif x[1]==RIGHT_EYE: tmp_sum[2]+=1
                else: tmp_sum[1]+=1
        for x in range(3):
            if sum(tmp_sum)>0 and tmp_sum[x]/sum(tmp_sum)>=0.5: result=x  # 大于50%
    if result!=Not_changed: record.clear()
    return result

if __name__=="__main__":
    # test()
    vc = cv2.VideoCapture(0)
    vc.set(4,600) # 分辨率 宽
    vc.set(3,600) # 分辨率 长
    vc.set(5,6)   # 帧数
    vc.set(10,0.1)
    record=[]
    while True:
        img=vc.read()[1]
        # tmp=time.time()
        result=get_eye_shrink(img)
        print(result)
        # print(time.time()-tmp)
        result=update(result)
        if result==Pageup:
            pyautogui.press('pageup')
        if result==Pagedown:
            pyautogui.press('pagedown')
            
        if result!=Not_changed: print(int(time.time())%60,result)
        if cv.waitKey(1) == ord(' '):
            break 
    vc.release()
    cv.destroyAllWindows()