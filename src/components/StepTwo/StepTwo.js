import React, { useRef, useState, useCallback, useEffect, useContext } from "react";
import { Context } from "../../Store/Store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Webcam from "react-webcam";
import useCountdown from "../../hooks/useCountdown";
import withHeaderFooter from "../../hoc/withHeaderFooter";

import { StoreOriginalPhoto } from "../../actions/Actions";

import "./StepTwo.css";

const StepTwo = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isCounting, setIsCounting] = useState(false);
  const [state, dispatch] = useContext(Context);

  const navigate = useNavigate();
  const { selectedBackground, originalPhoto } = state;

  const handleComplete = () => {
    capture();
  }

  const { time, start, reset } = useCountdown(5, handleComplete);

  useEffect(() => {
    if (originalPhoto !== null) transformPhoto(imgSrc, selectedBackground);
  }, [originalPhoto]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    dispatch(StoreOriginalPhoto(imageSrc));
    // Use the Electron IPC to save the image
    /*     if (imageSrc) {
          window.electron.saveImage(imageSrc).then((filePath) => {
            console.log('Image saved to:', filePath);
          }).catch((error) => {
            console.error('Failed to save image:', error);
          });
        } */
  }, [webcamRef]);

  const transformPhoto = async (image, backgroundId) => {
    console.log(image)
    let body = JSON.stringify({
      image: image,
      background_id: backgroundId
    });

    try {
      let response = await axios.post(`http://localhost:8000/transform_image`, body);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  const startCountdown = () => {
    setIsCounting(true);
    start();
  }

  const restart = () => {
    setImgSrc(null);
    setIsCounting(false);
    reset();
  }

  const nextStep = () => {
    navigate('/step-three');
  }
 
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <div className="video-container">
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={isCounting ? "blurry" : ""}
          />
          {isCounting && (
            <div className="overlay">
              <h1>{time}</h1>
            </div>
          )}
        </div>
      )}

      <div className="btn-container">
        {(!imgSrc && !isCounting) && <button onClick={startCountdown}>Capture photo</button>}
        {imgSrc && (
          <>
            <button onClick={restart}>Take another</button>
            <button onClick={() => nextStep()}>Next</button>
          </>
        )}
      </div>
    </div>
  );
}

export default withHeaderFooter(StepTwo);