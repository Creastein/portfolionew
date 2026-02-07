import React, { ReactNode, ErrorInfo } from 'react';

interface ServiceCardErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ServiceCardErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export default class ServiceCardErrorBoundary extends React.Component<
  ServiceCardErrorBoundaryProps,
  ServiceCardErrorBoundaryState
> {
  constructor(props: ServiceCardErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ServiceCardErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ServiceCard Error:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="relative overflow-hidden rounded-xl bg-surface border border-red-500/30 p-1">
          <div className="flex flex-col md:flex-row h-full rounded-lg overflow-hidden bg-[#151b26] p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="text-red-500 mb-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Service Unavailable
              </h3>
              <p className="text-secondary leading-relaxed">
                We&apos;re having trouble loading this service. Please try again later.
              </p>
              <button
                onClick={this.handleRetry}
                className="mt-4 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors duration-200 w-fit"
                type="button"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
