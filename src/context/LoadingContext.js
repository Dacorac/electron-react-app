import React, { createContext, useContext, useState } from "react";

const initialState = {
  isLoading: false
};

const LoadingContext = createContext({
  ...initialState,
  setLoader: () => {}
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoader = (loading) => {
    setIsLoading(loading);
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
