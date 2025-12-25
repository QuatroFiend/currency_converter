import React from "react";
import "./style.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter.tsx";
import ThemeToggle from "./components/ThemeProvider/ThemeProvider.tsx";
import ModalPopUp from "./components/ModalPopUp/ModalPopUp.tsx";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import CurrenciesModeTabs from "./components/CurrenciesModeSwitcher/CurrenciesModeTabs.tsx";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleHintClick = () => {
    setIsOpen(true);
  };
  const handleHintClose = () => {
    setIsOpen(false);
  };
  const [isCryptoMode, setIsCryptoMode] = React.useState(false);
  return (
    <>
      <div className="app-container min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-end items-end gap-3 sm:gap-4 pb-4 w-full">
          <div className="flex items-end gap-3 sm:gap-4">
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
        </div>
        <div className="w-full sm:w-auto flex justify-center sm:justify-center pb-[20px]">
          <CurrenciesModeTabs
            isCryptoMode={isCryptoMode}
            onModeChange={setIsCryptoMode}
          />
        </div>
        <main
          style={{
            margin: "auto",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <CurrencyConverter isCryptoMode={isCryptoMode} />
        </main>
      </div>
      {isOpen && <ModalPopUp onClose={handleHintClose} />}
    </>
  );
};

export default App;
