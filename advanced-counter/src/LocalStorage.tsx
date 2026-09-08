// LocalStorage.tsx

export const getStorageValue = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved !== null) {
    try {
      return JSON.parse(saved);
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
};

export const saveToStorageWithCleanup = (
  count: number,
  history: number[]
) => {
  let isCurrent = true;

  // Debounced async write simulation
  const timer = setTimeout(() => {
    if (isCurrent) {
      localStorage.setItem('counter_count', JSON.stringify(count));
      localStorage.setItem('counter_history', JSON.stringify(history));
      console.log('Saved count & history to localStorage');
    }
  }, 200);

  // Return cleanup function to cancel pending write if count changes again rapidly
  return () => {
    isCurrent = false;
    clearTimeout(timer);
  };
};