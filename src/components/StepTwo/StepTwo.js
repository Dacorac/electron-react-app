import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Context } from "../../store/Store";
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

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="Captured" />
      ) : (
        <div className="video-container">
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={isCounting ? "blurry" : ""}
          />
          {/* {isCounting && ( */}
            <div className="overlay">
              <h1>{time}</h1>
            </div>
          {/* )} */}
        </div>
      )}

      <div className="btn-container">
        {!imgSrc && !isCounting && <button onClick={startCountdown}>Capture photo</button>}
        {imgSrc && (
          <>
            <BackButton type='button' handleClick={restartCapture} />
            <NextButton type='button' handleClick={() => navigate('/step-three')} />
          </>
        )}
      </div>

      {transformLoading && <p>Transforming photo...</p>}
    </div>
  );
};

export default withHeaderFooter(StepTwo);
