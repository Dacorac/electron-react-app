import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/Store";
import { IoCameraSharp } from "react-icons/io5";
import Webcam from "react-webcam";
import withHeaderFooter from "../../hoc/withHeaderFooter";
import useWebcamCapture from "../../hooks/useWebcamCapture";
import useTransformPhoto from "../../hooks/useTransformPhoto";
import NextButton from "../customized/NextButton/NextButton";
import BackButton from "../customized/BackButton/BackButton";

import "./StepTwo.css";

const StepTwo = () => {
  const [state] = useContext(Context);
  const { webcamRef, imgSrc, isCounting, time, startCountdown, restartCapture } = useWebcamCapture();
  const { transformedPhoto, transformPhoto } = useTransformPhoto();
  const { selectedBackground, originalPhoto } = state;

  const navigate = useNavigate();

  const instructions_pic = '../assets/instructions.png';

  useEffect(() => {
    if (originalPhoto && selectedBackground) {
      transformPhoto(originalPhoto, selectedBackground);
    }
  }, [originalPhoto]);

  const videoConstraints = {
    height: 720,
    width: 720
  };

  return (
    <div className="step-two-container">
      {transformedPhoto ? (
        <img src={`data:image/png;base64,${transformedPhoto}`} alt="Captured" />
      ) : (
        imgSrc ? (
          <img src={imgSrc} alt="Captured" />
        ) : (
          <div className="video-container">
            <Webcam
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)",
                transformOrigin: "center",
              }}
              videoConstraints={videoConstraints}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className={isCounting ? "blurry" : ""}
            />
            {!imgSrc && (
              <div className="overlay">
                {isCounting ? 
                  <h1 className="x-large-text">{time}</h1> 
                  : 
                  <button className="step-two-camera-button unbuttonize" onClick={startCountdown}>
                    <IoCameraSharp className="step-two-camera-button-icon" />
                    <h1 className="medium-text">Tap to shoot</h1>
                  </button>}
              </div>
            )}
          </div>
        )
      )}
      {imgSrc && (
        <div className="btn-container">
          <BackButton type="button" text="RETAKE" handleClick={restartCapture} />
          <NextButton isDisabled={!transformedPhoto} type="button" handleClick={() => navigate('/step-three')} />
        </div>
      )}
      
      {!imgSrc && !transformedPhoto && <div className="step-two-instructions-container">
        <img className="step-two-instructions-img" src={instructions_pic} />
      </div>}
    </div>
  );
};

export default withHeaderFooter(StepTwo);
