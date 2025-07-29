import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";
import { Hint } from "./components/UI/Icons/Hint.tsx";
import ModalPopUp from "./components/ModalPopUp/ModalPopUp.tsx";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleHintClick = () => {
    setIsOpen(true);
  };
  const handleHintClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="app-container min-h-screen">
        <div className=" flex justify-end items-center gap-4 pb-4">
          <div
            className="hover:scale-[1.1] transform transition-all duration-300 cursor-pointer"
            onClick={handleHintClick}
          >
            <Hint />
          </div>
          <ThemeToggle />
        </div>
        <main
          style={{
            margin: "auto",
          }}
        >
          <CurrencyConverter />
        </main>
      </div>
      {isOpen && <ModalPopUp onClose={handleHintClose} />}
    </>
  );
};

export default App;
