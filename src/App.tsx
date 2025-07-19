import React from 'react'
import './style.css'
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <main style={{
          margin:"auto"
      }}>
        <div className="card">
          <CurrencyConverter />
        </div>
      </main>
    </div>
  )
}

export default App
