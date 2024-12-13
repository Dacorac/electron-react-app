import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/Store";
import Webcam from "react-webcam";
import withHeaderFooter from "../../hoc/withHeaderFooter";
import useWebcamCapture from "../../hooks/useWebcamCapture";
import useTransformPhoto from "../../hooks/useTransformPhoto";
import NextButton from "../customized/NextButton/NextButton";
import BackButton from "../customized/BackButton/BackButton";
import "./StepTwo.css";

const StepTwo = () => {
  const { webcamRef, imgSrc, isCounting, time, startCountdown, restartCapture } = useWebcamCapture();
  const { transformedPhoto, transformPhoto, loading: transformLoading } = useTransformPhoto();
  const [state] = useContext(Context);
  const { selectedBackground, originalPhoto } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (originalPhoto && selectedBackground) {
      transformPhoto(originalPhoto, selectedBackground);
    }
  }, [originalPhoto]);

  const videoConstraints = {
    height: 640,
    width: 960
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
            {isCounting && (
              <div className="overlay">
                <h1>{time}</h1>
              </div>
            )}
          </div>
        )
      )}

      <div className="btn-container">
        {!imgSrc && !isCounting && <button onClick={startCountdown}>Capture photo</button>}
        {imgSrc && (
          <>
            <BackButton type='button' handleClick={restartCapture} />
            <NextButton isDisabled={!transformedPhoto} type='button' handleClick={() => navigate('/step-three')} />
          </>
        )}
      </div>
    </div>
  );
};

export default withHeaderFooter(StepTwo);
