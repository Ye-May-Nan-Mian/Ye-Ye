import numpy as np

LEFT_FACE   = 0
CENTER_FACE = 1
RIGHT_FACE  = 2
NO_FACE     = 3

next_face = np.array([[0, 1, 0, 0], [0, 1, 2, 1], [2, 1, 2, 2]])
next_result = np.array([[1, 0, 1, 1], [1, 1, 1, 1], [1, 2, 1, 1]])