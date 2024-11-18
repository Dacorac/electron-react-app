import React from 'react';
import "./BackButton.css";

const BackButton = ({ type, handleClick }) => {
  const back_button = '../assets/back_button.png';
  return (  
    <button className='back-button unbuttonize' type={type} onClick={handleClick}>
      <img className='back-button-image' src={back_button} alt="Go back" />
    </button>
  );
}
 
export default BackButton;