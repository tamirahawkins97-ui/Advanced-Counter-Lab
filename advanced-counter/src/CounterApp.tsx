// CounterApp.tsx
import { useState, useEffect } from 'react';
import HistoryTracker from './HistoryTracking';
import { getStorageValue, saveToStorageWithCleanup } from './LocalStorage';

export function CounterApp() {
  // 1. Initial States from LocalStorage
  const [count, setCount] = useState<number>(() => getStorageValue('counter_count', 0));
  const [history, setHistory] = useState<number[]>(() => getStorageValue('counter_history', [0]));
  const [step, setStep] = useState<number>(1);

  // 2. Increment Handler (Adds step once, adds new total to history once)
  const handleIncrement = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory((prevHistory) => [...prevHistory, newCount]);
  };

  // 3. Decrement Handler (Subtracts step once, adds new total to history once)
  const handleDecrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory((prevHistory) => [...prevHistory, newCount]);
  };

  // 4. Reset Everything Back to 0
  const handleReset = () => {
    setCount(0);
    setHistory([0]);
    localStorage.removeItem('counter_count');
    localStorage.removeItem('counter_history');
  };

  // 5. Auto-Save Effect
  useEffect(() => {
    const cleanup = saveToStorageWithCleanup(count, history);
    return () => cleanup();
  }, [count, history]);

  // 6. Keyboard Listeners (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCount((currentCount) => {
          const newCount = currentCount + step;
          setHistory((prevHistory) => [...prevHistory, newCount]);
          return newCount;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCount((currentCount) => {
          const newCount = currentCount - step;
          setHistory((prevHistory) => [...prevHistory, newCount]);
          return newCount;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count, step]); // Listens to current count & step to avoid stale clicks

  return (
    <div className="counter-console">
      <div className="console-header">
        <p className="eyebrow">PLAYER 01 // LIVE SESSION</p>
        <h1>Interactive Counter</h1>
        <span className="status-light">SYSTEM ONLINE</span>
      </div>
      
      <div className="counter-display" aria-live="polite">
        <span className="display-label">CURRENT SCORE</span>
        {count}
      </div>

      {/* Step Input */}
      <div className="step-control">
        <label htmlFor="step">STEP VALUE</label>
        <input
          id="step"
          type="number"
          value={step}
          onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
        />
      </div>

      {/* Controls */}
      <div className="counter-controls">
        <button className="counter counter-primary" onClick={handleIncrement}>+ ({step}) [↑]</button>
        <button className="counter counter-secondary" onClick={handleDecrement}>- ({step}) [↓]</button>
        <button className="counter counter-reset" onClick={handleReset}>Reset All</button>
      </div>

      {/* History Child Component */}
      <HistoryTracker history={history} onClearHistory={handleReset} />
    </div>
  );
}

export default CounterApp;