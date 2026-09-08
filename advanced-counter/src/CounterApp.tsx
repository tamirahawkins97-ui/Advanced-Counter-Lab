// CounterApp.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { HistoryTracker } from './HistoryTracking';
import { getStorageValue, saveToStorageWithCleanup } from './LocalStorage';

export function CounterApp() {
  // 1. Initialize State lazily from LocalStorage
  const [count, setCount] = useState<number>(() => getStorageValue('counter_count', 0));
  const [history, setHistory] = useState<number[]>(() => getStorageValue('counter_history', [0]));
  const [step, setStep] = useState<number>(1);

  // 2. State Updater Callback
  const updateCount = useCallback((delta: number) => {
    setCount((prevCount) => {
      const nextCount = prevCount + delta;
      setHistory((prevHistory) => [...prevHistory, nextCount]);
      return nextCount;
    });
  }, []);

  // 3. Reset Mechanism
  const handleReset = () => {
    setCount(0);
    setHistory([0]);
    localStorage.removeItem('counter_count');
    localStorage.removeItem('counter_history');
  };

  // 4. Local Storage Auto-Save Effect with Cleanup
  useEffect(() => {
    const cleanup = saveToStorageWithCleanup(count, history);
    return () => cleanup(); // Cancels pending saves on rapid updates
  }, [count, history]);

  // 5. Keyboard Listener Effect with Cleanup & Step Dependency
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        updateCount(step);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        updateCount(-step);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup listener on unmount or when step changes
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step, updateCount]);

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h2>Interactive Counter</h2>
      
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '16px 0' }}>
        {count}
      </div>

      {/* Step Input */}
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="step">Custom Step Value: </label>
        <input
          id="step"
          type="number"
          value={step}
          onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
          style={{ width: '60px', padding: '4px' }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => updateCount(step)}>+ ({step}) [↑]</button>
        <button onClick={() => updateCount(-step)}>- ({step}) [↓]</button>
        <button onClick={handleReset}>Reset All</button>
      </div>

      {/* Render Child Component */}
      <HistoryTracker history={history} onClearHistory={handleReset} />
    </div>
  );
}

export default CounterApp;