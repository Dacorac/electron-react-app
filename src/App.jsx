import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import StepOne from "./components/StepOne/StepOne";
import StepTwo from "./components/StepTwo/StepTwo";
import StepThree from "./components/StepThree/StepThree";
import LandingPage from "./components/LandingPage/LandingPage";
import ThankyouPage from "./components/ThankyouPage/ThankyouPage";
import AlertDialog from "./components/customized/AlertDialog/AlertDialog";
import AlertPopup from "./components/customized/AlertPopup/AlertPopup";
import { AlertProvider } from "./context/AlertContext";
import Store from "./store/Store";
import { LoadingProvider } from "./context/LoadingContext";
import Loader from "./components/customized/Loader/Loader";

function App() {
  return (
    <div className="app_container">
      <Store>
        <AlertProvider>
          <HashRouter>
            <AlertDialog />
            <AlertPopup />
            <LoadingProvider>
              <Loader />
              <Routes>
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/step-one" element={<StepOne />} />
                <Route path="/step-two" element={<StepTwo />} />
                <Route path="/step-three" element={<StepThree />} />
                <Route path="/thank-you" element={<ThankyouPage />} />
                <Route path="/" element={<Navigate replace to="/landing" />} />
              </Routes>
            </LoadingProvider>
          </HashRouter>
        </AlertProvider>
      </Store>
    </div>
  );
}

export default App;