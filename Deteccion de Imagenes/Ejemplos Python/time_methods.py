import cv2 as cv
import numpy as np
import time
from matplotlib import pyplot as plt

img = cv.imread('sources/res_mario.png',0)
img2 = img.copy()
template = cv.imread('sources/coin.png',0)
w, h = template.shape[::-1]
# All the 6 methods for comparison in a list
methods = ['cv.TM_CCOEFF', 'cv.TM_CCOEFF_NORMED', 'cv.TM_CCORR', 'cv.TM_CCORR_NORMED', 'cv.TM_SQDIFF', 'cv.TM_SQDIFF_NORMED']

times = []

for meth in methods:
    start = time.monotonic()
    img = img2.copy()
    method = eval(meth)
    # Apply template Matching
    res = cv.matchTemplate(img,template,method)
    loc = np.where(res >= 0.9)
    for pt in zip(*loc[::-1]):
        cv.rectangle(img, pt, (pt[0] + w, pt[1] + h), 255, 2)

    stop = time.monotonic()

    template_time = stop - start

    times.append(template_time)

    cv.imshow('Resource',res)
    cv.imshow('Image',img)

    text = np.zeros((150,600,3), np.uint8)
    cv.putText(text,'Method: ' + meth, (10,50), cv.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv.putText(text,'Time: ' + str(template_time), (10,90), cv.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv.putText(text,'Threshold: ' + str(0.9), (10,130), cv.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)

    #Display the image
    cv.imshow("img",text)

    cv.waitKey(0)

plt.figure(figsize=(12,5))
plt.bar(methods, times)
plt.show()