import React from "react";
import { FaHome } from "react-icons/fa";

import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const headerImgUrl = '../assets/header_logo.png';
  const navigate = useNavigate();

  const goHome = () => {
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