import { useState } from 'react'
import './App.css'
import HistoryTracking from './HistoryTracking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Advanced Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <HistoryTracking currentHistory={[count]} onHistoryChange={() => {}} />
    </div>
  )
}

export default App;