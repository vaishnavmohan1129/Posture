const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const checkPosture = async () => {
  try {
    const response = await fetch(`${API_URL}/posture`);
    if (!response.ok) {
      throw new Error('Failed to check posture');
    }
    return await response.json();
  } catch (error) {
    console.error('Error checking posture:', error);
    throw error;
  }
};

export const getVideoFeed = () => {
  return `${API_URL}/video_feed`;
}; 