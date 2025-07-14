import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
  const spinnerClass = `spinner-container ${fullScreen ? 'fullscreen' : ''}`;
  const spinnerSize = `spinner-${size}`;

  return (
    <div className={spinnerClass}>
      <div className={`spinner ${spinnerSize}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 