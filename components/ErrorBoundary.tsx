import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center text-slate-600 bg-slate-50 p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="max-w-md mb-4">We're sorry for the inconvenience. Please try refreshing the page.</p>
          {this.state.error && (
            <details className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg text-left">
              <summary className="font-medium text-red-700 cursor-pointer">Error Details</summary>
              <pre className="mt-2 text-sm text-red-900 whitespace-pre-wrap break-all">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
