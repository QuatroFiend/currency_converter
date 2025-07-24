import React from "react";

interface DropDownProps {
  isOpen: boolean;
  items: string[];
  toggleDropDown: () => void;
  onChangeCurrency?: (currency: string) => void;
  activeTab?: "primary" | "secondary";
}

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const DropDown = ({
  isOpen,
  items,
  toggleDropDown,
  onChangeCurrency,
}: DropDownProps) => {
  return (
    <div className={"relative"}>
      <div
        className={`
                p-[10px] cursor-pointer ${
                  isOpen && "rotate-[180deg]"
                } transition duration-200 ease-in-out
                `}
        onClick={toggleDropDown}
      >
        <ArrowIcon className="text-green-400 dark:text-[#646cff] transition-colors duration-200" />
      </div>
      {isOpen && (
        <ul className="z-10  bg-[#e5e7eb] dark:bg-[#444] w-[80px] absolute h-[210px] overflow-auto transition duration-200 ease-in-out rounded-[6px]">
          {items.map((i) => (
            <li
              className={
                "px-[4px] flex hover:bg-green-400  dark:hover:bg-[#747bff] cursor-pointer duration-200 ease-in-out"
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
