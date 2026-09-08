import React, { useState } from 'react';

// 1. Data model for individual history items
export interface HistoryItem {
  id: string;
  historyData: number[]; 
  action: string;
}

// 2. Props expected by the HistoryTracking component
interface HistoryTrackingProps {
  currentHistory: number[];
  onHistoryChange: (newHistory: number[]) => void;
}

export function HistoryTracking({ currentHistory, onHistoryChange }: HistoryTrackingProps) {
  // 3. Properly typed internal state array using HistoryItem interface
  const [historyList, setHistoryList] = useState<HistoryItem[]>([
    { id: "History1", historyData: [10, 20], action: 'First History Update' },
    { id: "History2", historyData: [30, 40], action: 'Second History Update' }
  ]);

  const handleClearHistory = () => {
    onHistoryChange([]); // Notify parent component
    setHistoryList([]);  // Clear local state list
  };

  console.log("HistoryTracking rendered with parent history:", currentHistory);
    if (currentHistory.length === 0) {
      return (
        <>
          <p>No history available.</p>
          <button onClick={handleClearHistory}>Clear History</button>
        </>
      );
    }
    else if (historyList.length === 1) {
        return <p>History: {historyList[0].historyData.join(', ')}</p>; 
    }
    else if (historyList.length > 1) {
        return <p>History Count: {historyList.length}</p>;  
    }

    return(
        <>
        <button onClick={handleClearHistory}>Clear History</button>
        </>
      );
    }

    export default HistoryTracking;