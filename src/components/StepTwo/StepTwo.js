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
import Loader from "../customized/Loader/Loader";

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
    height: { min: 480 },
    width: { min: 720 },
    /* aspectRatio: 1.5 */
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="Captured" />
      ) : (
        <div className="video-container">
          <Webcam
            style={{transform: 'rotate(90deg)'}}
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
      )}

      {transformLoading && <Loader />}

      {transformedPhoto && <img src={`data:image/png;base64,${transformedPhoto}`} alt="Captured" />}

      <div className="btn-container">
        {!imgSrc && !isCounting && <button onClick={startCountdown}>Capture photo</button>}
        {imgSrc && (
          <>
            <BackButton type='button' handleClick={restartCapture} />
            <NextButton type='button' handleClick={() => navigate('/step-three')} />
          </>
        )}
      </div>
    </div>
  );
};

export default withHeaderFooter(StepTwo);
