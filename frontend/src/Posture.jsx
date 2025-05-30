import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";

// MediaPipe Pose
import { Pose } from "@mediapipe/pose";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { POSE_CONNECTIONS } from "@mediapipe/pose";
// For controlling the camera
import { Camera } from "@mediapipe/camera_utils";

const PoseDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // 1. Initialize MediaPipe Pose
    poseRef.current = new Pose({
      locateFile: (file) => {
        // Uses jsDelivr CDN for the wasm files
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      },
    });

    // Configure Pose
    poseRef.current.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // 2. Register the callback to run every time we get new pose data
    poseRef.current.onResults(onResults);

    // 3. Initialize the MediaPipe camera, which drives the pose solution
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null
    ) {
      cameraRef.current = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          // Send the frame to MediaPipe Pose for processing
          await poseRef.current.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      cameraRef.current.start();
    }
  }, []);

  // Callback: draw landmarks and connectors on the canvas
  const onResults = (results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    // Set canvas to same size as video
    canvasElement.width = webcamRef.current.video.videoWidth;
    canvasElement.height = webcamRef.current.video.videoHeight;

    // 1. Clear the canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // 2. Draw the webcam video as background
    canvasCtx.drawImage(
      results.image, 
      0, 
      0, 
      canvasElement.width, 
      canvasElement.height
    );

    // 3. If we have pose landmarks, draw them
    if (results.poseLandmarks) {
      // Draw pose connections (lines between landmarks)
      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00FF00",
        lineWidth: 2,
      });
      // Draw each landmark (keypoint)
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#FF0000",
        lineWidth: 1,
      });
    }

    canvasCtx.restore();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Posture / Pose Detection</h1>
      {/* The actual webcam (hidden) */}
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          width: 640,
          height: 480,
        }}
      />
      {/* Canvas for drawing landmarks */}
      <canvas
        ref={canvasRef}
        style={{
          width: 640,
          height: 480,
          border: "2px solid #000",
        }}
      />
    </div>
  );
};

export default PoseDetection;
