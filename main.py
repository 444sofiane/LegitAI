import cv2
import numpy as np

def detect_green_square_from_webcam():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Erreur : Impossible d'ouvrir la webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Erreur : Impossible de lire une image de la webcam.")
            break

        hsv_image = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

        lower_green = np.array([40, 40, 40])
        upper_green = np.array([80, 255, 255])

        mask = cv2.inRange(hsv_image, lower_green, upper_green)

        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        for contour in contours:
            epsilon = 0.04 * cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, epsilon, True)

            if len(approx) == 4:
                cv2.drawContours(frame, [approx], 0, (0, 255, 0), 5)

        cv2.imshow('Test reconaissance image', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

detect_green_square_from_webcam()
