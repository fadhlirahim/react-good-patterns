import React from 'react';
import { signal, computed } from '@preact/signals-react';

/**
 * Signal for the counter value
 */
const countSignal = signal<number>(0);

/**
 * SignalCounter component that demonstrates using @preact/signals-react for state management
 */
const SignalCounter: React.FC = () => {
  // Computed signal that derives its value from countSignal
  const double = computed<number>(() => countSignal.value * 2);

  return (
    <div>
      <h2>Signal Counter (@preact/signals-react)</h2>
      <p>Count: {countSignal.value}</p>
      <button onClick={() => countSignal.value++}>Increment</button>
      <p>Double: {double.value}</p>
    </div>
  );
};

export default SignalCounter;
