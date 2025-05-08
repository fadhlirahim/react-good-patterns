import React, { useState, useMemo, useCallback } from 'react';

/**
 * A component that demonstrates expensive computation that should be memoized
 */
const ExpensiveCalculation: React.FC<{ value: number }> = ({ value }) => {
  // Simulate an expensive calculation
  console.log('Performing expensive calculation...');
  const startTime = performance.now();

  // Artificially make this calculation "expensive" by doing redundant work
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(value * i);
  }

  const endTime = performance.now();
  const calculationTime = (endTime - startTime).toFixed(2);

  return (
    <div className="p-4 bg-blue-50 rounded border border-blue-200">
      <p className="mb-2">Calculation result: {result.toFixed(2)}</p>
      <p className="text-sm text-gray-600">
        Calculation took {calculationTime}ms
      </p>
    </div>
  );
};

/**
 * A memoized version of the expensive calculation component
 */
const MemoizedCalculation = React.memo(ExpensiveCalculation);

/**
 * MemoizationExample component that demonstrates using useMemo and useCallback for performance optimization
 */
const MemoizationExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(10);
  const [useMemoization, setUseMemoization] = useState(true);

  // Memoize the expensive calculation result
  const memoizedValue = useMemo(() => {
    console.log('Running memoized calculation...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(inputValue * i);
    }
    return result.toFixed(2);
  }, [inputValue]); // Only recalculate when inputValue changes

  // Memoize the increment function
  const incrementCounter = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Never recreate this function

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Memoization (useMemo & useCallback)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <p className="text-sm text-gray-600">
          Memoization prevents unnecessary recalculations and re-renders when props or state haven't changed.
          This example demonstrates how to optimize performance with useMemo and useCallback.
        </p>

        <div className="flex justify-between items-center">
          <span>Counter (unrelated state): {count}</span>
          <button onClick={incrementCounter} className="button button-secondary">
            Increment Counter
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="calculation-input" className="form-label">
            Calculation Input
          </label>
          <div className="flex gap-2">
            <input
              id="calculation-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="use-memoization"
            checked={useMemoization}
            onChange={() => setUseMemoization(!useMemoization)}
          />
          <label htmlFor="use-memoization">
            Use memoization
          </label>
        </div>

        <div className="border rounded p-4">
          <h4 className="font-semibold mb-2">
            {useMemoization ? 'Memoized Calculation' : 'Non-memoized Calculation'}
          </h4>

          {useMemoization ? (
            <div className="p-4 bg-blue-50 rounded border border-blue-200">
              <p className="mb-2">Memoized result: {memoizedValue}</p>
              <p className="text-sm text-gray-600">
                This value only recalculates when the input changes
              </p>
            </div>
          ) : (
            <MemoizedCalculation value={inputValue} />
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p>Try the following:</p>
            <ol className="list-decimal pl-5 space-y-1 mt-2">
              <li>Click "Increment Counter" - the calculation shouldn't run again</li>
              <li>Change the input value - the calculation will run again</li>
              <li>Toggle "Use memoization" to see the difference</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoizationExample;
