/**
 * @file PageErrorBoundary.tsx
 * @description Basic page-level error boundary used around lazy route content in Phase 6.
 * @module src/errors/PageErrorBoundary
 */
import type { ReactNode } from 'react';
import { Component } from 'react';

import { logger } from '@/monitoring';

import { ErrorFallback } from './ErrorFallback';

interface IPageErrorBoundaryProps {
  children: ReactNode;
}

interface IPageErrorBoundaryState {
  hasError: boolean;
}

export class PageErrorBoundary extends Component<IPageErrorBoundaryProps, IPageErrorBoundaryState> {
  public constructor(props: IPageErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): IPageErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error): void {
    logger.error('Page error boundary triggered', error);
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback level="page" onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }

  private readonly handleRetry = (): void => {
    this.setState({ hasError: false });
  };
}
