import React, { useState } from 'react';

/**
 * ErrorBoundary component to catch and handle errors in React components
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Component that will throw an error when a button is clicked
 */
const BuggyCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error('I crashed when count reached 3!');
  }

  return (
    <div className="p-4 rounded bg-blue-50 border border-blue-200">
      <p className="mb-2">Counter: {count}</p>
      <button
        onClick={() => setCount(c => c + 1)}
        className="button button-secondary"
      >
        Increment
      </button>
      <p className="mt-2 text-sm text-gray-600">
        (This counter will crash when it reaches 3)
      </p>
    </div>
  );
};

/**
 * Fallback UI to display when an error occurs
 */
const ErrorFallback: React.FC = () => (
  <div className="p-4 rounded bg-red-50 border border-red-200 text-red-600">
    <h4 className="font-bold mb-2">Something went wrong</h4>
    <p>The component crashed, but the error was caught by the ErrorBoundary.</p>
    <p className="mt-2 text-sm">Check the console for more details.</p>
  </div>
);

/**
 * ErrorBoundaryExample component that demonstrates using ErrorBoundary to catch errors
 */
const ErrorBoundaryExample: React.FC = () => {
  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Error Handling (Error Boundary)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Error boundaries catch errors during rendering, in lifecycle methods, and in constructors.
          They do not catch errors in event handlers or asynchronous code.
        </p>

        <ErrorBoundary fallback={<ErrorFallback />}>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ErrorBoundaryExample;
