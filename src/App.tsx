import { useState, useEffect } from 'react'
import './App.css'

const localKey = "ewasteCount"
function getData() {
  let localCount = localStorage.getItem(localKey)

    if (localCount) {
      console.log(localCount)
      return parseInt(localCount)
    } else {
      localStorage.setItem(localKey, "0")
      return 0
    }
}

function App() {
  const [count, setCount] = useState(getData)
  
  
  useEffect(() => {
    
  }, []) // fetch database data at start of program

  useEffect(() => {
    localStorage.setItem(localKey, count.toString())
  }, [count])
  

  return (
    <>
      <h1>SNHU E-Waste</h1>
      <div className="card">
        <h2>Number of laptops: {count}</h2>
        <button onClick={() => setCount((count) => count + 1)}>
          +
        </button>
        <button onClick={() => setCount((count) => count - 1)}>
          -
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
