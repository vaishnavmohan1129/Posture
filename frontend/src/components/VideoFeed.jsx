import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

const VideoFeed = () => {
  const webcamRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState(null);

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
        stream.getTracks().forEach(track => track.stop()); // Stop the stream after getting permission
      } catch (err) {
        setError("Please allow camera access to use posture detection");
        console.error("Camera permission error:", err);
      }
    };

    setupCamera();
  }, []);

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
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            className="w-full rounded-lg shadow-lg"
            screenshotFormat="image/jpeg"
          />
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
