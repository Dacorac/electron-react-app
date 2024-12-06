import React, { createContext, useState } from 'react';

const initialState = {
  messages: []
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
  closeAlert: () => {}
});

export const AlertProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const setAlert = (text, type) => {
    setMessages(
      [
        ...messages, 
        { text: text, type: type }
      ]
    );
  }

  const closeAlert = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  }

  return (
    <AlertContext.Provider
      value={{
        messages,
        setAlert,
        closeAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;