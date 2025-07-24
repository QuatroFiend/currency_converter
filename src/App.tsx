import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";
import { Hint } from "./components/UI/Icons/Hint.tsx";

const App: React.FC = () => {
  return (
    <>
      <div className=" flex justify-end items-center gap-4 pt-4">
        {/* <Hint /> */}
        <ThemeToggle />
      </div>
      <div className="app-container">
        <main
          style={{
            margin: "auto",
          }}
        >
          <CurrencyConverter />
        </main>
      </div>
    </>
  );
};

export default App;
