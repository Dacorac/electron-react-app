import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import StepOne from "./components/StepOne/StepOne";
import StepTwo from "./components/StepTwo/StepTwo";
import Store from "./Store/Store";

function App() {
  return (
    <div className="app_container">
      <Store>
        <HashRouter>
          <Routes>
            <Route path="/step-one" element={<StepOne />} />
            <Route path="/step-two" element={<StepTwo />} />
            <Route path="/" element={<Navigate replace to="/step-one" />} />
          </Routes>
        </HashRouter>
      </Store>
    </div>
  );
}

export default App;