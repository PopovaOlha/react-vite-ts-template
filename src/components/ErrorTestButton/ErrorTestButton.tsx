import { Component } from 'react';

class ErrorTestButton extends Component {
  constructor(props: string) {
    super(props);
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    throw new Error('This is a test error');
  }

  render() {
    return <button onClick={this.handleError}>Throw Error</button>;
  }
}

export default ErrorTestButton;
