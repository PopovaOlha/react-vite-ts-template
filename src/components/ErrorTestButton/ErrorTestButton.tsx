function ErrorTestButton() {
  const handleError = () => {
    throw new Error('This is a test error');
  };

  return <button onClick={handleError}>Throw Error</button>;
}

export default ErrorTestButton;
