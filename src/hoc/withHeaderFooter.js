import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const withHeaderFooter = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Header />
        <div className="main-view">
          <WrappedComponent {...props} />
        </div>
        <Footer />
      </>
    );
  };
}
 
export default withHeaderFooter;