import React from 'react';
import "./Footer.css";

const Footer = () => {
  const footerImgUrl = '../assets/footer_image.png';

  return (  
    <div className="footer-container">
      <div className="footer-image">
        <img src={footerImgUrl} alt="footer image" />
      </div>
    </div>
  );
}
 
export default Footer;