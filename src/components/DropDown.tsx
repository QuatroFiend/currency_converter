import arrow from "../../public/arrow.svg";
import React from "react";
interface DropDownProps {
    isOpen: boolean;
    items: string[];
    toggleDropDown: () => void;
    onChangeCurrency: any;
    onReplaceCurrency: any;
    activeTab?: 'primary' | 'secondary';
}
const DropDown = ({
                      isOpen,
                      items,
                      toggleDropDown,
                      onChangeCurrency,
                      onReplaceCurrency,
                      activeTab = 'primary'
                  }: DropDownProps) => {
    return (
        <div className={'relative '}>
            <div
                className={`
                p-[10px] cursor-pointer ${isOpen && ('rotate-[180deg]')} transition duration-200 ease-in-out
                `}
                onClick={toggleDropDown}
            >
                <img src={arrow} alt="arrow" />
            </div>
            {isOpen && (
                <ul className=' bg-[#444] w-[80px] absolute h-[210px] overflow-auto transition duration-200 ease-in-out rounded-[6px]'>
                    {items.map((i) => (
                        <li
                            className={"px-[4px] flex hover:bg-[#747bff] cursor-pointer duration-200 ease-in-out 0"}
                            key={i}
                            onClick={() => {
                                onChangeCurrency(i);
                                onReplaceCurrency(i, activeTab);
                                toggleDropDown()
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