import React from 'react';
import useAlert from '../../../hooks/useAlert';
import Alert from 'react-bootstrap/Alert';
import "./AlertPopup.css";

const AlertPopup = () => {
  const { messages } = useAlert();

  return (
    <>
      {
        messages.length > 0
          ?
          <div className='alert-popup-container'>
            {messages.map((m, index) => {
              return (
                <Alert className='alert-popup-toast' key={index} variant={m.type}>
                  {m.text}
                </Alert>
              )
            })}
          </div> : null
      }
    </>
  )
};

export default AlertPopup;