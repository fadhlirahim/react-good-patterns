import React from 'react';
import { signal, computed } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

/**
 * Signal for the counter value
 */
const countSignal = signal<number>(0);

/**
 * SignalCounter component that demonstrates using @preact/signals-react for state management
 */
const SignalCounter: React.FC = () => {
  // Use the useSignals hook to make the component reactive to signal changes
  useSignals();

  // Computed signal that derives its value from countSignal
  const double = computed(() => countSignal.value * 2);

  return (
    <div className="card shadow">
      <div className="card-header">
        <h3 className="card-title">Signal Counter (@preact/signals-react)</h3>
      </div>
      <hr style={{ margin: 0, borderTop: '1px solid #eee' }} />
      <div className="card-content flex flex-col gap-4">
        <div className="flex items-center justify-between p-2 rounded bg-blue-50 border border-blue-200">
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Count:</span>
          <span className="text-blue-600" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{countSignal.value}</span>
        </div>
        <button
          onClick={() => countSignal.value++}
          className="button button-secondary"
          style={{ width: '100%' }}
        >
          Increment
        </button>
        <div className="flex items-center justify-between p-2 rounded bg-blue-50 border border-blue-200">
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Double:</span>
          <span className="text-blue-600" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{double.value}</span>
        </div>
      </div>
    </div>
  );
};

export default SignalCounter;
