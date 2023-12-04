import React from 'react';
import { Component } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../types/interfaces';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <this.props.FallbackComponent
          error={this.state.error as Error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
