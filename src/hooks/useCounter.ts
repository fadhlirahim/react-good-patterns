import { useState, useEffect } from 'react';

/**
 * Custom hook that increments a counter at a specified interval
 * @param intervalMs - The interval in milliseconds between increments (default: 1000ms)
 * @returns The current count value
 */
export default function useCounter(intervalMs: number = 1000): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return count;
}
