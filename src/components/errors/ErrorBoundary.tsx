/*
 * Star Citizen - Executive Hangar, Based Project
 * Copyright (c) 2025 Feareis
 * SPDX-License-Identifier: MIT
 * Author: https://github.com/Feareis
 */

import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#2f2f2f]">
          <div className="flex flex-col text-center gap-2">
            <h1 className="text-4xl font-bold text-gray-300 mb-4">
              Something went wrong.
            </h1>
            <p className="text-lg text-gray-400">
              Please try refreshing the page or contact support.
            </p>
            {this.state.error && (
              <pre className="text-sm text-red-400">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }
      return this.props.children;
  };
}

export default ErrorBoundary;
