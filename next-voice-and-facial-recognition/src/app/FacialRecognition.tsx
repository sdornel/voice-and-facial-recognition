import { useEffect, useRef } from "react";

export default function FacialRecognition() {
    const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onplay = () => onPlay();
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    getUserMedia();
  }, []);

  // keep on processing the frames from camera
  const onPlay = () => {

  }

  return (
    <div>
      <h1>Facial Recognition Component</h1>
      <div style={{ position: 'relative' }} className="margin">
        <video
          ref={videoRef}
          id="inputVideo"
          autoPlay
          muted
          style={{ width: '100%', height: 'auto' }}
        />
        <canvas id="overlay" />
      </div>
    </div>
  );
}
