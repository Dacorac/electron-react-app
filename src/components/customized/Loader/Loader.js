import React from 'react';
import { useLoading } from '../../../context/LoadingContext';
import './Loader.css';

const Loader = () => {
  const { isLoading } = useLoading();
  
  return isLoading ? (
    <div className="loader-wrapper">
      <span className="loader"></span>
    </div>
  ) : null;
};

export default Loader;
