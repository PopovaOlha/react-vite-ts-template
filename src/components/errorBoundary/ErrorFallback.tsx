import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div>
    <h2>Something went wrong.</h2>
    <p>{error.message}</p>
    <button onClick={resetErrorBoundary}>Try Again</button>
    <p>
      Alternatively, you can{' '}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
      >
        reload the page
      </a>
      .
    </p>
  </div>
);

export default ErrorFallback;
