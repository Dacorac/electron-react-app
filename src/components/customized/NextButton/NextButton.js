import React from 'react';
import "./NextButton.css";

const NextButton = ({ type, handleClick, isDisabled }) => {
  const next_button = '../assets/next_button.png';
  const next_button_disabled = '../assets/next_button_disabled.png';

  return (
    <button className='next-button unbuttonize' type={type} onClick={handleClick} disabled={isDisabled}>
      {isDisabled ?
        <img className='next-button-image' src={next_button_disabled} alt="Next" />
        :
        <img className='next-button-image' src={next_button} alt="Next" />
      }
    </button>
  );
}

export default NextButton;