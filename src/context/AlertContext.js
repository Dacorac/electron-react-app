import React, { createContext, useState } from 'react';

const ALERT_TIME = 5000;
const initialState = {
  messages: [],
  error: {}
};

const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
  closeAlert: () => {},
  setErrorDialog: () => {},
  closeDialog: () => {}
});

export const AlertProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  
  const setAlert = (text, type) => {
    setMessages(
      [
        ...messages, 
        { text: text, type: type }
      ]
    );

    setTimeout(() => {
      setMessages([])
    }, ALERT_TIME);
  }

  const setErrorDialog = (errorObject) => {
    setError(errorObject);
    setShowDialog(true);
  }

  const closeAlert = (index) => {
    setMessages(messages.filter((_, i) => i !== index));
  }

  const closeDialog = () => {
    setError({});
    setShowDialog(false);
  }

  return (
    <AlertContext.Provider
      value={{
        messages,
        error,
        showDialog,
        setAlert,
        closeAlert,
        setErrorDialog,
        closeDialog
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;