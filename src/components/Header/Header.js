import React from "react";
import { FaHome } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const headerImgUrl = './assets/header_logo.png';

  return ( 
    <div className="header-container">
      <div className="header-image">
        <img src={headerImgUrl} alt="header image" />
      </div>
      <div className="header-home-icon">
        <FaHome />
      </div>
    </div>
  );
}
 
export default Header;