import torch
import cv2
import os
from dotenv import load_dotenv

from ultralytics import YOLO

vehicle_model = YOLO("yolo11m.pt")
# print(vehicle_model.names)


# Checking for GPU inference
# get index of currently selected device
print(torch.cuda.current_device())

# get number of GPUs available
print(torch.cuda.device_count())

# get the name of the device
print(torch.cuda.get_device_name(0))



final_results = {}
update = {}

vehicles = [2]


# Reading each Frames Inference from video/ CCTV
frame_num = -1
# Using video for now
video_path = "Number Plate - Google Drive_2.mp4"
cap = cv2.VideoCapture("video_path")
success = True
platedata = []


while success:
    success, frame = cap.read()
    frame_num += 1


    if success:

        # Detect the vehicle s
        detections = vehicle_model(frame)[0]
        detections_ = []
        for detection in detections.boxes.data.tolist():
            x1, y1, x2, y2, score, class_id = detection
            if int(class_id) in vehicles:
                detections_.append([x1, y1, x2, y2, score])

        final_results[frame_num] = {}
        print(detections_)

        # Display the frame
        cv2.imshow('Video Capture', frame)

        # Wait for key press
        key = cv2.waitKey(1) & 0xFF

        # Exit loop when 'q' is pressed
        if key == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()