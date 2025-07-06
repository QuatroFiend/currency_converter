import React, {useEffect, useState} from "react";
import DropDown from "./DropDown.tsx";


interface BlockProps {
    value: any;
    currency: any;
    onChangeValue: any;
    onChangeCurrency: any;
    defaultCurrencies: string[];
    dropDownItems: string[];
    onReplaceCurrency: any;
    isSecondary?: boolean;
}


export const Block = ({
                          defaultCurrencies,
                          onChangeCurrency,
                          onChangeValue,
                          value,
                          currency,
                          dropDownItems,
                          onReplaceCurrency,
                          isSecondary = false
                      }: BlockProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const dropdownElement = document.querySelector(".currencies-list");
            if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="block">
            <ul className="currencies-list">
                {defaultCurrencies.map((i) => (
                    <li
                        className={`currency-item ${i === currency ? "active" : ""}`}
                        onClick={() => onChangeCurrency(i)}
                        key={i}
                    >
                        <p className={'text-[14px] font-bold'}>{i}</p>
                    </li>
                ))}
                <DropDown
                    isOpen={isOpen}
                    items={dropDownItems}
                    toggleDropDown={toggleDropDown}
                    onChangeCurrency={onChangeCurrency}
                    onReplaceCurrency={onReplaceCurrency}
                    activeTab={isSecondary ? 'secondary' : 'primary'}
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