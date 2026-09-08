// HistoryTracking.tsx
import { useEffect } from 'react';

export interface HistoryTrackerProps {
  history: number[];
  onClearHistory: () => void;
}

export function HistoryTracker({ history, onClearHistory }: HistoryTrackerProps) {
  // Real-time console log whenever history changes
  useEffect(() => {
    console.log("History updated in HistoryTracker:", history);
  }, [history]);

  return (
    <div className="history-panel">
      <div className="history-heading">
        <h2>History Tracker</h2>
        <span>{history.length - 1} MOVES</span>
      </div>

      {history.length === 0 ? (
        <p className="empty-history">No history available.</p>
      ) : (
        <>
          <div className="history-values" aria-label="Previous counts">
            {history.map((value, index) => (
              <span key={`${value}-${index}`}>{value}</span>
            ))}
          </div>
          <button className="clear-history" onClick={onClearHistory}>Clear History</button>
        </>
      )}
    </div>
  );
}

export default HistoryTracker;