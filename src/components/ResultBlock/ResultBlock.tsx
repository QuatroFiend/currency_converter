import React, {useState, useRef, useEffect} from 'react';
import DropDown from "../DropDown/DropDown.tsx";
import {useMedia} from "../../customHooks/useIsMobile/useMedia.ts";

interface BlockProps {
    value: any;
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
                         secondaryCurrencies
                     }: BlockProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const blockRef = useRef<HTMLDivElement>(null);

    const toggleDropDown = () => {
        setIsOpen((prev) => !prev);
    };
    /** closing a list w outside click */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (blockRef.current && !blockRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCurrencySelect = (currencyCode: string) => {
        onChangeCurrency(currencyCode);
    };

    const formattedValue = typeof value === 'number' ?
        value.toFixed(value.toString().includes('.') ? 2 : 0) :
        '0.00';
    const isMobile = useMedia(860)
    let flexibleCurrenciesArray = isMobile ? secondaryCurrencies.slice(0, 3) : secondaryCurrencies.slice(0, 4)

    if (isMobile && !flexibleCurrenciesArray.includes(currency)) {
        flexibleCurrenciesArray[0] = currency;
    }
    return (
        <div className="block" ref={blockRef}>
            <div className="flex flex-row justify-between">
                <ul className="currencies-list">
                    {flexibleCurrenciesArray.map((i) => (
                        <li
                            className={`currency-item ${i === currency ? "active" : ""}`}
                            onClick={() => handleCurrencySelect(i)}
                            key={i}
                        >
                            <p className={'text-[14px] font-bold'}>{i}</p>
                        </li>
                    ))}
                </ul>
                <DropDown
                    isOpen={isOpen}
                    items={dropDownItems}
                    toggleDropDown={toggleDropDown}
                    onChangeCurrency={handleCurrencySelect}
                    activeTab={'secondary'}/>
            </div>
            <input
                className="input"
                type="text"
                value={formattedValue}
                readOnly
            />
        </div>
    );
};

export default ResultBlock;