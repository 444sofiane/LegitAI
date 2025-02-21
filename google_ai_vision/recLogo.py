import cv2
import os
import io
import numpy as np
from google.cloud import vision

# Set up Google Cloud Vision API client
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'client_api.json'
client = vision.ImageAnnotatorClient()

def detect_logo(frame):
    # Convert the frame to bytes
    _, encoded_image = cv2.imencode('.jpg', frame)
    content = encoded_image.tobytes()
    image = vision.Image(content=content)

    # Perform logo detection
    response = client.logo_detection(image=image)
    return response.logo_annotations

def draw_logo_annotations(frame, annotations):
    for annotation in annotations:
        description = annotation.description
        score = annotation.score
        vertices = annotation.bounding_poly.vertices

        # Draw bounding box
        pts = np.array([(vertex.x, vertex.y) for vertex in vertices], np.int32)
        pts = pts.reshape((-1, 1, 2))  # reshape to required shape for polylines

        cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 0), thickness=2)

        # Put text with the brand name
        x, y = pts[0][0]
        cv2.putText(frame, f'{description} ({score:.2f})', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Initialize webcam
cap = cv2.VideoCapture(0)

while cap.isOpened():
    # Capture frame-by-frame
    ret, frame = cap.read()

    if not ret:
        break

    # Detect logos in the current frame
    annotations = detect_logo(frame)

    # Draw annotations on the frame
    draw_logo_annotations(frame, annotations)

    # Display the resulting frame
    cv2.imshow('Logo Detection', frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture and destroy windows
cap.release()
cv2.destroyAllWindows()
