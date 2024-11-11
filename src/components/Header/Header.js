import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useResetStore from "../../hooks/useResetStore";

import "./Header.css";

const Header = () => {
  const headerImgUrl = '../assets/header_logo.png';
  const navigate = useNavigate();
  const resetState = useResetStore();

  const goHome = () => {
    resetState();
    navigate('/landing');
  }

  return ( 
    <div className="header-container">
      <div className="header-image">
        <img src={headerImgUrl} alt="header image" />
      </div>
      <div className="header-home-icon" onClick={goHome}>
        <FaHome />
      </div>
    </div>
  );
}
 
export default Header;