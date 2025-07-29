import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";
import ModalPopUp from "./components/ModalPopUp/ModalPopUp.tsx";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

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
            <LightBulbIcon
              className={clsx(
                isOpen &&
                  "text-yellow-500 dark:text-yellow-500 size-9 transition-colors duration-200",
                "size-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200",
                "dark:text-[#d3d3d3] dark:hover:text-[#fff]"
              )}
            />
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
