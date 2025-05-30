from flask import Flask, Response, jsonify
import cv2
import mediapipe as mp
import math
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)

# Initialize MediaPipe Pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils

# Open webcam (adjust index if needed)
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    logging.error("Error: Could not open webcam. Check if it is connected or if another application is using it.")

def calculate_angle(a, b, c):
    angle = math.degrees(math.atan2(c.y - b.y, c.x - b.x) -
                         math.atan2(a.y - b.y, a.x - b.x))
    if angle < 0:
        angle += 360
    return angle

def check_posture(landmarks):
    left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
    left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
    left_knee = landmarks[mp_pose.PoseLandmark.LEFT_KNEE]

    hip_angle = calculate_angle(left_shoulder, left_hip, left_knee)

    if hip_angle > 160:
        return "Good Posture", (0, 255, 0), hip_angle  # Green
    elif hip_angle < 120:
        return "Bad Posture: Slouching", (0, 0, 255), hip_angle  # Red
    else:
        return "Neutral Posture", (255, 255, 0), hip_angle  # Yellow

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            logging.error("Failed to capture frame from webcam.")
            break

        # Convert frame to RGB for MediaPipe
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        if results.pose_landmarks:
            # Draw standard pose landmarks and connectors
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)

            # Mark face landmarks with larger blue circles (indices 0-8)
            landmarks = results.pose_landmarks.landmark
            face_indices = [0, 1, 2, 3, 4, 5, 6, 7, 8]
            h, w, _ = frame.shape
            for idx in face_indices:
                x = int(landmarks[idx].x * w)
                y = int(landmarks[idx].y * h)
                cv2.circle(frame, (x, y), 6, (255, 0, 0), -1)  # Blue circle

            # Add posture feedback text
            posture_feedback, color, _ = check_posture(landmarks)
            cv2.putText(frame, posture_feedback, (10, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2, cv2.LINE_AA)

        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            logging.error("Failed to encode frame.")
            continue

        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/')
def home():
    return "Backend is running!"

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/posture')
def posture_endpoint():
    success, frame = cap.read()
    if not success:
        return jsonify({"error": "Failed to capture image"}), 500

    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark
        posture_feedback, _, hip_angle = check_posture(landmarks)
        response = {
            "posture": posture_feedback,
            "hip_angle": hip_angle
        }
    else:
        response = {
            "posture": "No person detected",
            "hip_angle": None
        }

    return jsonify(response)

if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5000, debug=True)
    finally:
        cap.release()
