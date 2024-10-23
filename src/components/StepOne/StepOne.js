import React, { useEffect, useState, useContext } from "react";
import { SelectNewBackground } from "../../actions/Actions";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Store/Store";
import withHeaderFooter from "../../hoc/withHeaderFooter";

import "./StepOne.css";

const StepOne = () => {
  const [state, dispatch] = useContext(Context);
  const [backgroundSelected, setBackgroundSelected] = useState(null);

  const navigate = useNavigate();
  
  const backgroundList = [
    { id: 1, url: "../assets/background_01.png", caption: "Canarvan Gorge" },
    { id: 2, url: "../assets/background_02.png", caption: "Famous Bottle Tree" },
    { id: 3, url: "../assets/background_03.png", caption: "Flying high in the sky" },
  ];

  useEffect(() => {
    dispatch(SelectNewBackground(backgroundSelected));
  }, [backgroundSelected])

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
                onClick={() => setBackgroundSelected(background.id)}
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
}
 
export default withHeaderFooter(StepOne);