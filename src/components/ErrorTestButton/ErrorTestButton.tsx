import React from 'react';
import './ErrorButton.css';

function ErrorTestButton() {
  const handleError = () => {
    throw new Error('This is a test error');
  };

  return (
    <button className="error-button" onClick={handleError}>
      Throw Error
    </button>
  );
}

export default ErrorTestButton;
