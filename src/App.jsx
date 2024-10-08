import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import StepOne from "./components/StepOne/StepOne";
import StepTwo from "./components/StepTwo/StepTwo";
import StepThree from "./components/StepThree/StepThree";
import LandingPage from "./components/LandingPage/LandingPage";

import Store from "./Store/Store";

function App() {
  return (
    <div className="app_container">
      <Store>
        <HashRouter>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/step-one" element={<StepOne />} />
            <Route path="/step-two" element={<StepTwo />} />
            <Route path="/step-three" element={<StepThree />} />
            <Route path="/" element={<Navigate replace to="/landing" />} />
          </Routes>
        </HashRouter>
      </Store>
    </div>
  );
}

export default App;