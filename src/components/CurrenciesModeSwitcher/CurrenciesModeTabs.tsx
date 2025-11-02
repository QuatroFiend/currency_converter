import React from "react";
import bitcoin from "/bitcoin-sv-bsv-logo.svg";
import euro from "/euro-currency-symbol.svg";

interface CurrenciesModeTabsProps {
  isCryptoMode?: boolean;
  onModeChange?: (isCrypto: boolean) => void;
}

const CurrenciesModeTabs: React.FC<CurrenciesModeTabsProps> = ({
  isCryptoMode,
  onModeChange,
}) => {
  return (
    <div className="shadow-[0_4px_10px_4px_rgba(0,0,0,0.1)] flex space-x-4 bg-gray-100 dark:bg-[#444] rounded-full p-1 px-3 flex flex-wrap">
      <button
        onClick={() => onModeChange?.(true)}
        className={`w-[300px] py-1 px-3 rounded-full transition-all duration-500 ${
          isCryptoMode
            ? "dark:bg-gradient-to-r dark:from-[rgba(100,108,255,0.4)] dark:to-[rgba(100,108,255,0.7)] dark:border-[#646cff] dark:shadow-[0_0_25px_rgba(100,108,255,0.5)] bg-gradient-to-r from-[rgba(34,197,94,0.4)] to-[rgba(34,197,94,0.7)] border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.5)] scale-105"
            : "border border-transparent hover:border-gray-500 hover:bg-gray-700/20 dark:text-white text-gray-700"
        }`}
      >
        <img
          src={bitcoin}
          alt="Bitcoin"
          className={`w-10 h-10 inline-block mr-1 transition-all duration-500 ${
            isCryptoMode
              ? "animate-pulse filter brightness-125"
              : "opacity-60 grayscale hover:grayscale-0 dark:brightness-100 brightness-[0.3]"
          }`}
        />
      </button>

      <button
        onClick={() => onModeChange?.(false)}
        className={`w-[300px] py-1 px-3 rounded-full transition-all duration-500 ${
          !isCryptoMode
            ? "dark:bg-gradient-to-r dark:from-[rgba(100,108,255,0.4)] dark:to-[rgba(100,108,255,0.7)] dark:border-[#646cff] dark:shadow-[0_0_25px_rgba(100,108,255,0.5)] bg-gradient-to-r from-[rgba(34,197,94,0.4)] to-[rgba(34,197,94,0.7)] border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.5)] scale-105"
            : "border border-transparent hover:border-gray-500 hover:bg-gray-700/20 dark:text-white text-gray-700"
        }`}
      >
        <img
          src={euro}
          alt="Euro"
          className={`w-6 h-6 inline-block mr-1 transition-all duration-500 ${
            !isCryptoMode
              ? "animate-pulse filter brightness-125"
              : "opacity-60 grayscale hover:grayscale-0 dark:brightness-100 brightness-[0.3]"
          }`}
        />
      </button>
      {/* 
      <button
        onClick={() => onModeChange?.(false)}
        className={`w-[300px] py-1 px-3 rounded-full transition-all duration-500 ${
          !isCryptoMode
            ? "dark:bg-gradient-to-r from-[rgba(100,108,255,0.4)] to-[rgba(100,108,255,0.7)] border-2 border-[#646cff] shadow-[0_0_25px_rgba(100,108,255,0.5)] scale-105"
            : "text-white border border-transparent hover:border-gray-500 hover:bg-gray-700/20"
        }`}
      >
        <img
          src={euro}
          alt="Euro"
          className={`w-6 h-6 inline-block mr-1 transition-all duration-500 ${
            !isCryptoMode
              ? "animate-pulse filter brightness-125"
              : "opacity-60 grayscale hover:grayscale-0"
          }`}
        />
      </button> */}
    </div>
  );
};

export default CurrenciesModeTabs;
