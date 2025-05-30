import React from "react";

const VideoFeed = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Live Pose Detection</h1>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Pose Detection Feed"
        className="w-1/2 max-w-md border-2 border-black rounded-lg"
      />
    </div>
  );
};

export default VideoFeed;
