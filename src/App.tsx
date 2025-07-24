import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <ThemeToggle />
      <main
        style={{
          margin: "auto",
        }}
      >
        <CurrencyConverter />
      </main>
    </div>
  );
};

export default App;
