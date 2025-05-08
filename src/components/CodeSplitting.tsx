import React, { lazy, Suspense, useState } from 'react';

/**
 * Lazy-loaded heavy component that will only be loaded when needed
 */
const HeavyComponent = lazy(() => {
  // Simulate a delay to demonstrate loading state
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(import('./LazyLoadedComponent'));
    }, 1500);
  });
});

/**
 * CodeSplitting component that demonstrates using React.lazy and Suspense for code splitting
 */
const CodeSplitting: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Code Splitting (React.lazy + Suspense)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Code splitting allows you to split your code into smaller chunks which can be loaded on demand.
          This can significantly improve the initial load time of your application.
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowComponent(!showComponent)}
            className="button"
          >
            {showComponent ? 'Hide' : 'Load'} Component
          </button>
        </div>

        {showComponent && (
          <div className="border rounded p-4">
            <Suspense fallback={
              <div className="p-4 text-center">
                <div className="mb-2">Loading component...</div>
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
              </div>
            }>
              <HeavyComponent />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeSplitting;
