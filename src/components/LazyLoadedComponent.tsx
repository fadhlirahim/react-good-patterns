import React, { useState } from 'react';

/**
 * A "heavy" component that is lazy loaded
 * In a real application, this might be a complex component with many dependencies
 */
const LazyLoadedComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-semibold">Heavy Component Loaded!</h4>
      <p>
        This component was loaded lazily using React.lazy and Suspense.
        In a real application, this could be a complex component with charts,
        rich text editors, or other heavy dependencies.
      </p>

      <div className="p-4 bg-blue-50 rounded border border-blue-200">
        <p className="mb-2">Interactive counter: {count}</p>
        <button
          onClick={() => setCount(c => c + 1)}
          className="button button-secondary"
        >
          Increment
        </button>
      </div>

      <div className="text-sm text-gray-600">
        <p>Benefits of code splitting:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Reduced initial bundle size</li>
          <li>Faster initial page load</li>
          <li>Load components only when needed</li>
          <li>Better resource utilization</li>
        </ul>
      </div>
    </div>
  );
};

export default LazyLoadedComponent;
