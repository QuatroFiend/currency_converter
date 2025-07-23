import arrow from "../../../public/arrow.svg";
import React from "react";

interface DropDownProps {
  isOpen: boolean;
  items: string[];
  toggleDropDown: () => void;
  onChangeCurrency?: (currency: string) => void;
  activeTab?: "primary" | "secondary";
}
const DropDown = ({
  isOpen,
  items,
  toggleDropDown,
  onChangeCurrency,
}: DropDownProps) => {
  return (
    <div className={"relative "}>
      <div
        className={`
                p-[10px] cursor-pointer ${
                  isOpen && "rotate-[180deg]"
                } transition duration-200 ease-in-out
                `}
        onClick={toggleDropDown}
      >
        <img src={arrow} alt="arrow" />
      </div>
      {isOpen && (
        <ul className="bg-[#444] w-[80px] absolute h-[210px] overflow-auto transition duration-200 ease-in-out rounded-[6px] z-10">
          {items.map((i) => (
            <li
              className={
                "px-[4px] flex hover:bg-[#747bff] cursor-pointer duration-200 ease-in-out"
              }
              key={i}
              onClick={() => {
                if (onChangeCurrency) {
                  onChangeCurrency(i);
                }
                toggleDropDown();
              }}
            >
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
