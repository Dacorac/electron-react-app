import { useState, useCallback, useRef, useContext } from "react";
import useCountdown from "./useCountdown";
import { StoreOriginalPhoto } from "../actions/Actions";
import { Context } from "../store/Store";

const useWebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [, dispatch] = useContext(Context);

  const { time, start, reset } = useCountdown(5, () => capture());

  const startCountdown = () => {
    setIsCounting(true);
    start();
  };

  const restartCapture = () => {
    setImgSrc(null);
    setIsCounting(false);
    dispatch(StoreOriginalPhoto(null));
    reset();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    // Rotate the image
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      // Set canvas size to match rotated dimensions
      canvas.width = img.height;
      canvas.height = img.width;

      // Rotate the image
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(90 * (Math.PI / 180)); // Rotate 90 degrees
      context.drawImage(img, -img.width / 2, -img.height / 2);

      // Convert canvas back to base64
      const rotatedImageSrc = canvas.toDataURL('image/png');

      // Set the rotated image
      setImgSrc(rotatedImageSrc);
      dispatch(StoreOriginalPhoto(rotatedImageSrc));
    };
  }, [webcamRef]);

  return {
    webcamRef,
    imgSrc,
    isCounting,
    time,
    startCountdown,
    restartCapture,
    capture,
  };
};

export default useWebcamCapture;
