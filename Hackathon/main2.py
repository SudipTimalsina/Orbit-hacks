from ultralytics import YOLO
import cv2
from deep_sort_realtime.deepsort_tracker import DeepSort
from utils import *
import easyocr
import pymongo
import os
from dotenv import load_dotenv

load_dotenv(override=True)
Connection = os.getenv('CONNECTION')
print(Connection)

plate_nump_back_temp = ''
score_temp = 0
plate_nump_temp = ''

client = pymongo.MongoClient(Connection)

database = client["Yolo"]

collection = database["vehicles"]

# Initialize the OCR reader
reader = easyocr.Reader(['en'], gpu=True)

final_results = {}
update = {}

# import torch

# # get index of currently selected device
# print(torch.cuda.current_device())
#
#
# # get number of GPUs available
# print(torch.cuda.device_count())
#
#
# # get the name of the device
# print(torch.cuda.get_device_name(0))

mot_tracker = DeepSort(max_age=5,
                       n_init=2,
                       nms_max_overlap=1.0,
                       max_cosine_distance=0.3,
                       nn_budget=None,
                       override_track_class=None,
                       embedder="mobilenet",
                       half=True,
                       bgr=True,
                       embedder_gpu=True,
                       embedder_model_name=None,
                       embedder_wts=None,
                       polygon=False,
                       today=None)

frame_num = -1
# loading YOLO model
vehicle_model = YOLO('yolo11n.pt')
plate_detector = YOLO('last.pt')
vehicles = [2]
# assigning video path and reading video
video_path = "Number Plate - Google Drive_2.mp4"
cap = cv2.VideoCapture("Untitled video - Made with Clipchamp (3).mp4")
platedata = []
# reading frames
success = True
while success:
    success, frame = cap.read()
    frame_num += 1
    results_ = []
    data = []

    if success:


        final_results[frame_num] = {}
        print(frame_num)

        detections = vehicle_model(frame)[0]
        detections_ = []
        for detection in detections.boxes.data.cpu().numpy().tolist():

            x1, y1, x2, y2, score, class_id = detection
            w = x2 - x1
            h = y2 - y1
            if int(class_id) in vehicles:
                list1 = [x1, y1, w, h]
                mytuple = (list1, score, 'car')
                detections_.append(mytuple)

        tracking_ids = mot_tracker.update_tracks(detections_, frame=frame)

        results = plate_detector(frame)[0]

        for result in results.boxes.data.cpu().numpy().tolist():
            x1, y1, x2, y2, score, class_id = result
            xcar1, ycar1, xcar2, ycar2, car_id, car_time = get_car(result, tracking_ids)
            # results_.append([xcar1, ycar1, xcar2, ycar2 ,car_id])
            # print (results_)
            # results_.append([x1, y1, x2, y2, score ,class_id])

            license_plate_crop = frame[int(y1):int(y2), int(x1): int(x2)]
            up_width = int((x2 - x1) * 2)
            up_height = int((y2 - y1) * 2)
            up_points = (up_width, up_height)
            license_plate_upscale = cv2.resize(license_plate_crop, up_points, interpolation=cv2.INTER_LINEAR)

            license_plate_corp_gray = cv2.cvtColor(license_plate_crop, cv2.COLOR_BGR2GRAY)
            _, license_plate_crop_thresh = cv2.threshold(license_plate_corp_gray, 64, 255, cv2.THRESH_BINARY_INV)

            plate, score, type = read_license_plate(license_plate_crop_thresh)

            if plate is not None:
                final_results[frame_num][car_id] = {'car': {'bbox': [xcar1, ycar1, xcar2, ycar2]},
                                                    'license_plate': {'bbox': [x1, y1, x2, y2], 'text': plate,
                                                                      'bbox_score': score, 'text_score': score}}

                if type == 'front' and score > 0.5:
                    update = {
                        'frame_nmr': int(frame_num),
                        'car_id': int(car_id),
                        'car_bbox': "[" + str(xcar1) + " " + str(ycar1) + " " + str(xcar2) + " " + str(ycar2) + "]",
                        'license_plate_bbox': "[" + str(x1) + " " + str(y1) + " " + str(x2) + " " + str(y2) + " " + "]",
                        'license_number': plate,
                        'license_number_score': float(score),
                        'entry_time': car_time,
                        'exit_time': '',
                        'exited': bool(False)
                    }
                    if (update_DB_front(plate, score, score_temp, plate_nump_temp)):
                        collection.insert_one(update)
                        score_temp = score
                        plate_nump_temp = plate

                elif type == 'back':
                    if (update_DB_back(plate, plate_nump_back_temp)):
                        query = {"$set": {"exit_time": car_time, "exited": bool(True)}}
                        collection.update_one({"license_number": plate}, query)
                        plate_nump_back_temp = plate

print(final_results)
cap.release()
cv2.destroyAllWindows()



