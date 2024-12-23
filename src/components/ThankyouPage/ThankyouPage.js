import React from 'react';
import withHeaderFooter from "../../hoc/withHeaderFooter";

import "./ThankyouPage.css";

const ThankyouPage = () => {
  return (  
    <div className="thank-you-container">
      <h1 className="large-title">Thank You!</h1>
      <p className="medium-text">Your photo will be sent to your email shortly. <br /> Enjoy your visit!</p>
      <p className="small-text">Please check your spam folder, just in case. If you do not receive your photo within 48 hours, please contact <strong>visitorexperiences@lifeflight.org.au</strong> <br />We may not be able to retrieve your photo after this timeframe.</p>
    </div>
  );
}
 
export default withHeaderFooter(ThankyouPage);