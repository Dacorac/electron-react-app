import React from "react";
import { useNavigate } from "react-router-dom";
import withHeaderFooter from "../../hoc/withHeaderFooter";
import useBackgroundSelection from "../../hooks/useBackgroundSelection";
import "./StepOne.css";
import NextButton from "../customized/NextButton/NextButton";

const StepOne = () => {
  const { backgroundList, selectBackground } = useBackgroundSelection();
  const navigate = useNavigate();

  return (
    <div className="step_one_container">
      <p className="large-title">Choose your background</p>
      <div className="step_one_images_grid">
        {backgroundList.map((background) => (
          <div className="step_one_background" key={background.id}>
            <div className="step_one_image">
              <img
                className="step_one_image_button"
                src={background.url}
                alt={background.id}
                onClick={() => selectBackground(background.id)}
                tabIndex={0}
              />
            </div>
            <p className="step_one_image_caption small-text">{background.caption}</p>
          </div>
        ))}
      </div>
      <div className="step_one_next_button">
        <NextButton type='button' handleClick={() => navigate('/step-two')} />
      </div>
    </div>
  );
};

export default withHeaderFooter(StepOne);
