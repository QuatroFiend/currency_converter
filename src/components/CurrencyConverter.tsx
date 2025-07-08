import React, {useEffect, useState} from "react";
import {Block} from "./Block.tsx";
import ResultBlock from "./ResultBlock.tsx";
import {recalculateValues} from "../utils/recalculateValues.ts";

export type RatesData = {
    [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
    const [rates, setRates] = useState<RatesData>({});
    const itemsForDropDown = Object.keys(rates);
    const [primaryCurrencies, setPrimaryCurrencies] = useState(["USD", "PLN", "CZK", "AUD"]);
    const [secondaryCurrencies, setSecondaryCurrencies] = useState(['PLN', 'BRL', 'CAD', 'DKK']);
    const [primaryCurrency, setPrimaryCurrency] = useState('USD');
    const [secondaryCurrency, setSecondaryCurrency] = useState('PLN');
    const [primaryValue, setPrimaryValue] = useState(0);
    const [secondaryValue, setSecondaryValue] = useState(0);
    const changePrimaryValue = (value: number) => {
        if (!rates[primaryCurrency] || !rates[secondaryCurrency]) return;
        const price = value / rates[primaryCurrency];
        const result = price * rates[secondaryCurrency];
        setSecondaryValue(Number(result.toFixed(result * 100 % 1 === 0 ? 0 : 2)));
        setPrimaryValue(value);
    };

    const onChangePrimaryCurrency = (cur: string) => {
        setPrimaryCurrency(cur);
        recalculateValues(cur, secondaryCurrency, primaryValue, rates, setSecondaryValue);
      
        if (primaryCurrencies.includes(cur)) return;
        const updated=[...primaryCurrencies];
        const activeIndex = updated.indexOf(primaryCurrency);
        if(activeIndex !== -1){
            updated[activeIndex] = cur;
        }else{
            updated.unshift(cur);
        }
        const withoutDuplicates = updated.filter(
            (item, index) => updated.indexOf(item) === index
        );
        setPrimaryCurrencies(withoutDuplicates.slice(0,4))
    };
    const onChangeSecondaryCurrency = (cur: string) => {
        setSecondaryCurrency(cur);
        recalculateValues(primaryCurrency, cur, primaryValue, rates, setSecondaryValue);
        
        if (secondaryCurrencies.includes(cur)) return;
        
        const updated = [...secondaryCurrencies];
        
        const activeIndex = updated.indexOf(secondaryCurrency);
        if (activeIndex !== -1) {
            updated[activeIndex] = cur;
        } else {
            /** if something was wrong we push to the start  */
            updated.unshift(cur);
        }
        /** delete twins */
        const withoutDuplicates = updated.filter((item, index) => updated.indexOf(item) === index);
        
        setSecondaryCurrencies(withoutDuplicates.slice(0, 4));
    };

    useEffect(() => {
        fetch("https://api.frankfurter.app/latest")
            .then((res) => res.json())
            .then((data) => {
                const updatedRates = {...data.rates, USD: 1};
                setRates(updatedRates);
                setTimeout(() => {
                    recalculateValues(primaryCurrency, secondaryCurrency, primaryValue || 1, rates, setSecondaryValue);
                }, 0);
            })
            .catch((err) => {
                console.warn(err);
                alert("Error fetching rates.");
            });
    }, []);

    /** recount from primary  */
    useEffect(() => {
        if (Object.keys(rates).length > 0) {
            recalculateValues(primaryCurrency, secondaryCurrency, primaryValue, rates, setSecondaryValue);
        }
    }, [primaryCurrency, secondaryCurrency, primaryValue, rates]);

    useEffect(() => {
        setSecondaryValue(secondaryValue);
    }, [secondaryCurrency, secondaryValue])

    return (
        <div className="block-container">
            <Block
                currency={primaryCurrency}
                onChangeCurrency={onChangePrimaryCurrency}
                onChangeValue={changePrimaryValue}
                value={primaryValue}
                defaultCurrencies={primaryCurrencies}
                dropDownItems={itemsForDropDown}
                isSecondary={false}
            />
            <div className="divider"/>
            <ResultBlock
                currency={secondaryCurrency}
                onChangeCurrency={onChangeSecondaryCurrency}
                value={secondaryValue}
                dropDownItems={itemsForDropDown}
                isSecondary={true}
                secondaryCurrencies={secondaryCurrencies}
            />
        </div>
    );
};

export default CurrencyConverter;
