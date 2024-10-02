import React from "react";
import Header from "../components/Header/Header";

const withHeaderFooter = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <Header />
        <main>
          <WrappedComponent {...props} />
        </main>
      </div>
    );
  };
}
 
export default withHeaderFooter;