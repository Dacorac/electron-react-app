import React, { createContext, useContext, useState } from "react";
import useSendVisitorDetails from "../hooks/useSendVisitorDetails";
import useTransformPhoto from "../hooks/useTransformPhoto";
import useUploadImage from "../hooks/useUploadImage";

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
