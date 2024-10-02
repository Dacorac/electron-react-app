import React from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css';

const LandingPage = () => {
  const logo_url = './assets/landing_logo.png';
  const navigate = useNavigate();

  const onStartClick = () => {
    navigate('/step-one');
  }

  return ( 
    <div className="landing-container">
      <div className="landing-logo-container">
        <img src={logo_url} alt="LifeFlight Logo" className="logo-branding"/>
      </div>
      <div className="landing-text-container">
        Green Screen Photo Opportunity!
      </div>
      <div className="landing-start-button">
        <button className="start-button" onClick={onStartClick}>Start</button>
      </div>
      <div className="landing-privacy-policy">
        Privacy Policy
      </div>
      <div className="landing-background-pattern">
      </div>
    </div>
  );
}
 
export default LandingPage;