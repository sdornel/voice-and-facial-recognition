import { useEffect, useRef } from "react";

export default function FacialRecognition() {
  const videoRef = useRef(null as any);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    getUserMedia();
  }, []);

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
