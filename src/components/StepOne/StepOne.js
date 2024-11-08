import React from "react";
import { useNavigate } from "react-router-dom";
import withHeaderFooter from "../../hoc/withHeaderFooter";
import useBackgroundSelection from "../../hooks/useBackgroundSelection";
import "./StepOne.css";

const StepOne = () => {
  const { backgroundList, selectBackground } = useBackgroundSelection();
  const navigate = useNavigate();

  return (
    <div className="step_one_container">
      <h1>Choose your background</h1>
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
            <p className="step_one_image_caption">{background.caption}</p>
          </div>
        ))}
      </div>
      <div className="btn-container">
        <button onClick={() => navigate("/step-two")}>Next</button>
      </div>
    </div>
  );
};

export default withHeaderFooter(StepOne);
