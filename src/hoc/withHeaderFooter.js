import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const withHeaderFooter = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <Header />
        <main>
          <WrappedComponent {...props} />
        </main>
        <Footer />
      </div>
    );
  };
}
 
export default withHeaderFooter;