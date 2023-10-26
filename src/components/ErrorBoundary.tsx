import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types/interfaces';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error: Error) {
      console.error(error);
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        return <div>Something went wrong.</div>;
      }
      return this.props.children;
    }
  }
  
  export default ErrorBoundary;