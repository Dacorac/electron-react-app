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
    reset();
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    dispatch(StoreOriginalPhoto(imageSrc));
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
