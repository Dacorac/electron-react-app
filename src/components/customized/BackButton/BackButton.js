import React from 'react';
import "./BackButton.css";

const BackButton = ({ type, text, handleClick }) => {
  const back_button = '../assets/back_button.png';
  return (  
    <button className='back-button unbuttonize' type={type} onClick={handleClick}>
      <img className='back-button-image' src={back_button} alt="Go back" />
      {text && <div className="back-button-text large-text">{text}</div>}
    </button>
  );
}
 
export default BackButton;