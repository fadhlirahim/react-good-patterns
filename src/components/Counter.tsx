import React from 'react';
import useCounter from '../hooks/useCounter';

/**
 * Counter component that uses a custom hook to display an auto-incrementing counter
 */
const Counter: React.FC = () => {
  const count = useCounter();

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Counter (Custom Hook)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col items-center gap-2">
        <div className="counter-display">
          <div className="counter-value">{count}</div>
          <div className="counter-label">Auto-incrementing</div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
