import React, {useEffect, useState} from "react";
import {Block} from "./Block.tsx";
import ResultBlock from "./ResultBlock.tsx";

interface RatesData {
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
    //const [activeIndex,setActiveIndex] = useState('');
    const changePrimaryValue = (value: number) => {
        if (!rates[primaryCurrency] || !rates[secondaryCurrency]) return;
        const price = value / rates[primaryCurrency];
        const result = price * rates[secondaryCurrency];
        setSecondaryValue(Number(result.toFixed(result * 100 % 1 === 0 ? 0 : 2)));
        setPrimaryValue(value);
    };

    const onChangePrimaryCurrency = (cur: string) => {
        setPrimaryCurrency(cur);
        recalculateValues(cur, secondaryCurrency, primaryValue);
        const newPrimaryCurrencies = [
            cur,
            ...primaryCurrencies.filter(item => item !== cur).slice(0, 3)       
        ];
        setPrimaryCurrencies(newPrimaryCurrencies);
        //
        // setPrimaryCurrency(cur);
        // setActiveIndex(cur);
        // recalculateValues(cur, secondaryCurrency, primaryValue)
    };
   ///console.log('ACTIVE INDEX',activeIndex,' ')  
    const onChangeSecondaryCurrency = (cur: string) => {
        const currentIndex = secondaryCurrencies.indexOf(secondaryCurrency);
        setSecondaryCurrency(cur);
        recalculateValues(primaryCurrency, cur, primaryValue);
        if (currentIndex !== -1) {
            const newSecondaryCurrencies = [
                cur,
                ...secondaryCurrencies.filter(item => item !== cur).slice(0, 3)
            ];
            newSecondaryCurrencies[currentIndex] = cur;
            setSecondaryCurrencies(newSecondaryCurrencies);
            console.log('Обновлен список вторичных валют:', secondaryCurrencies);
        }
    };

    const recalculateValues = (primCurrency: string, secCurrency: string, value: number) => {
        if (!rates[primCurrency] || !rates[secCurrency] || Object.keys(rates).length === 0) return;
        const eurValue = value / rates[primCurrency];
        const result = eurValue * rates[secCurrency];
        const formattedResult = Number(result.toFixed(result * 100 % 1 === 0 ? 0 : 2));
        setSecondaryValue(formattedResult);
        console.log(`Конвертация: ${value} ${primCurrency} = ${formattedResult} ${secCurrency}`);
    };
    useEffect(() => {
        fetch("https://api.frankfurter.app/latest")
            .then((res) => res.json())
            .then((data) => {
                const updatedRates = {...data.rates, USD: 1};
                setRates(updatedRates);
                setTimeout(() => {
                    recalculateValues(primaryCurrency, secondaryCurrency, primaryValue || 1);
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
            recalculateValues(primaryCurrency, secondaryCurrency, primaryValue);
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
