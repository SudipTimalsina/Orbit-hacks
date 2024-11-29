import cv2
from ultralytics import YOLO

# Load the YOLO model (replace 'yolov8n.pt' with your model path)
model = YOLO('last.pt')

# Input video file
input_video_path = 'Untitled video - Made with Clipchamp (3).mp4'
# Output video file
output_video_path = 'output_video.mp4'

# Open the input video
cap = cv2.VideoCapture(input_video_path)

# Get video properties
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))

# Define video writer to save the output
fourcc = cv2.VideoWriter_fourcc(*'mp4v')  # Codec for MP4
out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Perform inference
    results = model(frame)

    # Annotate frame with bounding boxes and labels
    for result in results[0].boxes.data.tolist():
        x1, y1, x2, y2, score, class_id = result
        x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])

        # Draw bounding box
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Put class label and confidence score
        label = f"{model.names[int(class_id)]} {score:.2f}"
        cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Write the frame to the output video
    out.write(frame)

    # Display the frame
    # cv2.imshow('Video', frame)
    # if cv2.waitKey(1) & 0xFF == ord('q'):
    #     break

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()
