import cv2
import numpy as np
import time
from matplotlib import pyplot as plt

threshold = 1.0
threshold_step = 0.05

rgb_times = []
gray_times = []
thresholds = []

while(threshold > threshold_step):

    rgb_start = time.monotonic()

    #Procesamiento RGBA

    img_rgb = cv2.imread('sources/res_mario.png', cv2.IMREAD_UNCHANGED)
    template_rgb = cv2.imread('sources/coin.png', cv2.IMREAD_UNCHANGED)
    h, w = template_rgb.shape[:-1]

    res = cv2.matchTemplate(img_rgb, template_rgb, cv2.TM_CCOEFF_NORMED)
    loc = np.where(res >= threshold)
    for pt in zip(*loc[::-1]):
        cv2.rectangle(img_rgb, pt, (pt[0] + w, pt[1] + h), (0, 0, 255, 255), 2)

    rgb_stop = time.monotonic()

    rgb_time = rgb_stop - rgb_start

    rgb_times.append(rgb_time)

    cv2.imshow('result_rgb.png', img_rgb)

    gray_start = time.monotonic()

    img_rgb = cv2.imread('sources/res_mario.png', cv2.IMREAD_UNCHANGED)
    template_rgb = cv2.imread('sources/coin.png', cv2.IMREAD_UNCHANGED)

    #Procesamiento a GRIS

    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)
    template_gray = cv2.cvtColor(template_rgb, cv2.COLOR_BGR2GRAY)
    w, h = template_gray.shape[::-1]

    res = cv2.matchTemplate(img_gray, template_gray, cv2.TM_CCOEFF_NORMED)
    loc = np.where(res >= threshold)
    for pt in zip(*loc[::-1]):
        cv2.rectangle(img_gray, pt, (pt[0] + w, pt[1] + h), (255, 255, 255, 255), 2)

    gray_stop = time.monotonic()

    gray_time = gray_stop - gray_start

    gray_times.append(gray_time)

    cv2.imshow('result_gray.png', img_gray)

    #Window management

    # Create a black image
    img = np.zeros((150,600,3), np.uint8)
    cv2.putText(img,'Threshold: ' + str(threshold), (10,50), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv2.putText(img,'RGBA Time: ' + str(rgb_time), (10,90), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)
    cv2.putText(img,'GRAY Time: ' + str(gray_time), (10,130), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2)

    #Display the image
    cv2.imshow("img",img)

    #New set
    thresholds.append(threshold)
    threshold = round(threshold - threshold_step,2)

    cv2.waitKey(0)

plt.plot(thresholds, rgb_times, color = 'r')
plt.plot(thresholds, gray_times, color = 'b')
plt.show()