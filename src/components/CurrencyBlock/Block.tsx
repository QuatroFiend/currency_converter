import React from "react";
import DropDown from "../DropDown/DropDown.tsx";
import { useBlock } from "../../customHooks/useBlock/useBlock.ts";
import clsx from "clsx";

interface BlockProps {
  value: number;
  currency: string;
  onChangeValue?: (value: number) => void;
  onChangeCurrency: (currency: string) => void;
  defaultCurrencies: string[];
  dropDownItems: string[];
  isSecondary?: boolean;
}

export const Block = ({
  defaultCurrencies,
  onChangeCurrency,
  onChangeValue,
  value,
  currency,
  dropDownItems,
  isSecondary = false,
}: BlockProps) => {
  const { isOpen, toggleDropDown, flexibleCurrenciesArray, blockRef } =
    useBlock(currency, defaultCurrencies);
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-[10px]",
        "bg-white text-black rounded-[10px] p-6 shadow",
        "dark:bg-[#2f2f2f] dark:text-white"
      )}
      ref={blockRef}
    >
      <ul className="flex items-center gap-[10px] mb-[15px] list-none">
        {flexibleCurrenciesArray.map((i) => (
          <li
            className={clsx(
              "px-[15px] py-2 border border-[#444] rounded-[5px] cursor-pointer transition-all duration-200 font-bold text-[14px]",
              i === currency
                ? "bg-green-200 text-green-900 border-green-500 dark:bg-[rgba(100,108,255,0.5)] dark:text-white dark:border-[#646cff]"
                : "hover:bg-green-100 hover:border-green-400 dark:hover:bg-[rgba(100,108,255,0.2)] dark:hover:border-[rgba(100,108,255,0.4)]"
            )}
            onClick={() => onChangeCurrency(i)}
            key={i}
          >
            <p>{i}</p>
          </li>
        ))}
        <DropDown
          isOpen={isOpen}
          items={dropDownItems}
          toggleDropDown={toggleDropDown}
          onChangeCurrency={onChangeCurrency}
          activeTab={isSecondary ? "secondary" : "primary"}
        />
      </ul>
      {onChangeValue && (
        <input
          className={clsx(
            "input",
            "bg-white text-black border-green-500 focus:border-green-600 focus:ring-green-200",
            "dark:bg-[#242424] dark:text-white dark:border-[#444] dark:focus:border-[#646cff]"
          )}
          type="number"
          value={value}
          onChange={(e) => onChangeValue(parseFloat(e.target.value))}
        />
      )}
      <input
        className={clsx(
          "input",
          "bg-white text-black border-green-500 focus:border-green-600 focus:ring-green-200",
          "dark:bg-[#242424] dark:text-white dark:border-[#444] dark:focus:border-[#646cff]"
        )}
        type="text"
        value={value}
        readOnly
      />
    </div>
  );
};
