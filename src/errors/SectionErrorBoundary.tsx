/**
 * @file SectionErrorBoundary.tsx
 * @description Basic section-level error boundary for isolated public data sections.
 * @module src/errors/SectionErrorBoundary
 */
import type { ReactNode } from 'react';
import { Component } from 'react';

import { logger } from '@/monitoring';

import { ErrorFallback } from './ErrorFallback';

interface ISectionErrorBoundaryProps {
  children: ReactNode;
}

interface ISectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<ISectionErrorBoundaryProps, ISectionErrorBoundaryState> {
  public constructor(props: ISectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): ISectionErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error): void {
    logger.error('Section error boundary triggered', error);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback level="section" onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }

  private readonly handleRetry = (): void => {
    this.setState({ hasError: false });
  };
}
