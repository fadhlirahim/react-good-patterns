import React from 'react';
import useCounter from '../hooks/useCounter';

/**
 * Counter component that uses a custom hook to display an auto-incrementing counter
 */
const Counter: React.FC = () => {
  const count = useCounter();

  return (
    <div>
      <h2>Counter (Custom Hook)</h2>
      <p>Count: {count}</p>
    </div>
  );
};

export default Counter;
