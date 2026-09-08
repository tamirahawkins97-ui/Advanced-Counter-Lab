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
    <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '16px' }}>
      <h3>History Tracker</h3>

      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <>
          <p><strong>Previous counts:</strong> {history.join(', ')}</p>
          <p><small>Total changes: {history.length - 1}</small></p>
          <button onClick={onClearHistory}>Clear History</button>
        </>
      )}
    </div>
  );
}

export default HistoryTracker;