import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);
  const [postureStatus, setPostureStatus] = useState(null);
  const [angle, setAngle] = useState(null);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "user"
          } 
        });
        setHasPermission(true);
      } catch (err) {
        setError("Camera permission denied or dismissed. Please allow camera access to use posture detection.");
        console.error("Camera permission error:", err);
      }
    };
    setupCamera();
  }, []);

  useEffect(() => {
    if (!hasPermission || !webcamRef.current) return;

    const Pose = window.Pose;
    const POSE_CONNECTIONS = window.POSE_CONNECTIONS;
    const drawConnectors = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (results.poseLandmarks) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = webcamRef.current.video.videoWidth;
        canvas.height = webcamRef.current.video.videoHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
        drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1 });
        const neckAngle = calculateNeckAngle(results.poseLandmarks);
        setAngle(neckAngle);
        if (neckAngle > 45) {
          setPostureStatus("Bad Posture - Neck angle too high");
        } else if (neckAngle < 15) {
          setPostureStatus("Bad Posture - Neck angle too low");
        } else {
          setPostureStatus("Good Posture");
        }
      }
    });

    let animationFrameId;
    const detectPose = async () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        await pose.send({ image: webcamRef.current.video });
      }
      animationFrameId = requestAnimationFrame(detectPose);
    };
    detectPose();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      pose.close();
    };
  }, [hasPermission]);

  const calculateNeckAngle = (landmarks) => {
    const nose = landmarks[0];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const shoulderMidpoint = {
      x: (leftShoulder.x + rightShoulder.x) / 2,
      y: (leftShoulder.y + rightShoulder.y) / 2
    };
    const angle = Math.abs(Math.atan2(
      nose.x - shoulderMidpoint.x,
      nose.y - shoulderMidpoint.y
    ) * (180 / Math.PI));
    return Math.round(angle);
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  if (error) {
    return (
      <div className="flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold mb-4">Live Pose Detection</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Live Pose Detection</h1>
      {hasPermission ? (
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <Webcam
              ref={webcamRef}
              audio={false}
              videoConstraints={videoConstraints}
              className="w-full rounded-lg shadow-lg"
              mirrored={true}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
          {postureStatus && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              postureStatus.includes("Good") 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              <p className="font-bold">{postureStatus}</p>
              {angle && <p className="text-sm">Neck Angle: {angle}°</p>}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-4">
          <p className="text-gray-600">Requesting camera permission...</p>
        </div>
      )}
    </div>
  );
};

export default VideoFeed;
