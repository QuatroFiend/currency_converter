import React from "react";
import DropDown from "../DropDown/DropDown.tsx";
import { useBlock } from "../../customHooks/useBlock/useBlock.ts";

interface BlockProps {
  value: number;
  currency: string;
  onChangeCurrency: (currency: string) => void;
  dropDownItems: string[];
  isSecondary?: boolean;
  secondaryCurrencies: string[];
}

const ResultBlock = ({
  onChangeCurrency,
  value,
  currency,
  dropDownItems,
  secondaryCurrencies,
}: BlockProps) => {
  const { isOpen, toggleDropDown, flexibleCurrenciesArray, blockRef } =
    useBlock(currency, secondaryCurrencies);
  return (
    <div className="block" ref={blockRef}>
      <div className="flex flex-row justify-between">
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
            activeTab={"secondary"}
          />
        </ul>
      </div>
      <input className="input" type="text" value={value} readOnly />
    </div>
  );
};

export default ResultBlock;
