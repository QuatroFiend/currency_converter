import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex justify-end items-center gap-4 pt-4">
        {/* <Hint /> */}
      
      </div>
      <div className="app-container min-h-screen">
        <main
          style={{
            margin: "auto",
          }}
        >
            <ThemeToggle />
          <CurrencyConverter />
        </main>
      </div>
    </>
  );
};

export default App;
