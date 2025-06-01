# 🧍‍♂️ Body Posture Detection Web App

A full-stack web application that detects and classifies human body posture in real time using webcam input. It uses **MediaPipe Pose** and **OpenCV** for pose estimation via a **Flask backend**, and a **React.js frontend** for visual display and user interaction.

---

## 🚀 Live Demo

🔗 **Frontend (React Deployed on Netlify)**:  
[https://posture2004.netlify.app/#/video-feed](https://posture2004.netlify.app/#/video-feed)

> ⚠️ Make sure to allow webcam access when prompted by your browser.

---

## 🧠 Features

- Real-time webcam-based posture detection
- Calculates hip angle using key body landmarks
- Classifies posture into:
  - 🟢 Good Posture
  - 🟡 Neutral Posture
  - 🔴 Bad Posture (Slouching)
- React frontend updates posture every 2 seconds
- Clean and responsive UI

---

## 🛠️ Tech Stack

### 🖥️ Frontend
- React.js (Vite or CRA)
- Axios for API requests
- Tailwind CSS (optional)
- React Router
- Netlify for deployment

### 🔙 Backend
- Python 3
- Flask
- OpenCV
- MediaPipe

