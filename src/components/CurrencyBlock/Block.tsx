import React from "react";
import DropDown from "../DropDown/DropDown.tsx";
import { useBlock } from "../../customHooks/useBlock/useBlock.ts";

interface BlockProps {
  value: number;
  currency: string;
  onChangeValue: (value: number) => void;
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
    <div className="block" ref={blockRef}>
      <ul className="currencies-list">
        {flexibleCurrenciesArray.map((i) => (
          <li
            className={`currency-item ${i === currency ? "active" : ""}`}
            onClick={() => onChangeCurrency(i)}
            key={i}
          >
            <p className={"text-[14px] font-bold"}>{i}</p>
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
      <input
        className="input"
        type="number"
        value={value}
        onChange={(e) => onChangeValue(parseFloat(e.target.value))}
      />
    </div>
  );
};
