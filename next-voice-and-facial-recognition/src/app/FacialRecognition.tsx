import { useEffect, useRef, useState } from "react";
import * as faceapi from 'face-api.js';
import Webcam from "react-webcam";

export default function FacialRecognition() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [storedDescriptors, setStoredDescriptors] = useState<Float32Array[]>([]);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    };

    const fetchImage = async () => {
      const url = 'https://localhost:3500/facial-recognition';
      const response = await fetch(url);
      const data = await response.json();

      const descriptors = await Promise.all(data.map(async (imgUrl: string) => {
        const img = await faceapi.fetchImage(imgUrl);
        const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        return detection.descriptor;
      }));

      setStoredDescriptors(descriptors);
    };

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

    const init = async () => {
      await loadModels();
      await fetchImage();
      await getUserMedia();
    };

    init();
  }, []);

  const capture = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (detections) {
        const distance = faceapi.euclideanDistance(detections.descriptor, storedDescriptors[0]);
        console.log('Distance:', distance);
        // Implement logic to handle matching
      }
    }
  };

  const onPlay = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      faceapi.matchDimensions(canvas, {
        width: video.width,
        height: video.height,
      });

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
        const resizedDetections = faceapi.resizeResults(detections, {
          width: video.width,
          height: video.height,
        });
        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }, 100);
    }
  };

  return (
    <div>
      <h1>Facial Recognition Component</h1>
      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          id="inputVideo"
          autoPlay
          muted
          style={{ width: '100%', height: 'auto' }}
        />
        <canvas ref={canvasRef} id="overlay" style={{ position: 'absolute', top: 0, left: 0 }} />
      </div>
      <button onClick={capture}>Capture</button>
    </div>
  );
}
