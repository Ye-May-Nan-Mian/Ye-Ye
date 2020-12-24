import numpy as np

LEFT_FACE = 0
CENTER_FACE = 1
RIGHT_FACE = 2
NO_FACE = 3

# 状态机
# next face state = next_state[last face state][cur detect result from detect_face()]
next_state = np.array([[0, 1, 1, 0],
                       [3, 3, 3, 3],
                       [0, 3, 3, 0],
                       [2, 3, 4, 5],
                       [3, 3, 7, 7],
                       [2, 3, 4, 5],
                       [3, 3, 3, 3],
                       [7, 6, 6, 7],
                       [3, 3, 3, 5],
                       [9, 8, 9, 9]])

# 返回给前端的 result
# result = next_result[last face state][cur detect result from detect_face()]
# 0: turn up, 1: no need to turn page, 2: turn down
next_result = np.array([[1, 1, 1, 1],
                        [0, 0, 0, 0],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [2, 2, 2, 2],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1],
                        [1, 1, 1, 1]])
