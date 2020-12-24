from numpy import array

LEFT_FACE = 0
CENTER_FACE = 1
RIGHT_FACE = 2
NO_FACE = 3

# 状态机
# next face state = next_face[last face state][cur detect result from detect_face()]
next_face = array([[0, 1, 0, 0],
                   [0, 1, 2, 1],
                   [0, 1, 2, 2],
                   [3, 1, 3, 3]])

# 返回给前端的 result
# result = next_result[last face state][cur detect result from detect_face()]
# 0: turn up, 1: no need to turn page, 2: turn down
next_result = array([[1, 0, 1, 1],
                     [1, 1, 1, 1],
                     [1, 2, 1, 1],
                     [1, 1, 1, 1]])
