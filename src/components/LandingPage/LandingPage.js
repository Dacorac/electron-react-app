import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './LandingPage.css';
import useAlert from '../../hooks/useAlert';
import useOnlineStatus from '../../hooks/useOnlineStatus';

const LandingPage = () => {
  const logo_url = '../assets/landing_logo.png';
  const background_pattern = '../assets/patterns_yellow.jpg';
  const start_button = '../assets/start_button.png';
  const isOnline = useOnlineStatus();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOnline !== undefined) {
      if (isOnline === false) {
        setAlert('No Internet. Please, check your internet connection and try again.', 'danger');
      }
    }
  }, [isOnline]);

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
        <button className="start-button unbuttonize" onClick={onStartClick}>
          <img className="start-button-image"src={start_button} />
        </button>
      </div>
      <div className="landing-privacy-policy">
        Privacy Policy
      </div>
      <div className="landing-background-pattern" style={{ backgroundImage: `url(${background_pattern})` }}>
      </div>
    </div>
  );
}
 
export default LandingPage;