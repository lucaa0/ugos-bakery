import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    toast({
      title: 'An error occurred',
      description: error.message,
      variant: 'destructive',
    });
  }

  render() {
    if (this.state.hasError) {
      return null; // Or render some fallback UI if desired
    }

    return this.props.children;
  }
}

export default ErrorBoundary;