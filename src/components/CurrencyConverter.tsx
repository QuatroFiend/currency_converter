import React, {useEffect, useState} from "react";
import {Block} from "./Block.tsx";

interface RatesData {
    [key: string]: number;
}

const CurrencyConverter: React.FC = () => {
    const [rates, setRates] = useState<RatesData>({});
    const itemsForDropDown = Object.keys(rates);
    const [defaultCurrencies, setDefaultCurrencies] = useState(["USD", "PLN", "CZK", "AUD"]);
    const [primaryCurrency, setPrimaryCurrency] = useState(defaultCurrencies[0]);
    const [secondaryCurrency, setSecondaryCurrency] = useState(
        defaultCurrencies[1]
    );
    const [primaryValue, setPrimaryValue] = useState(0);
    const [secondaryValue, setSecondaryValue] = useState(0);
    const [replacedCurrency, setReplacedCurrency] = useState('')
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const changePrimaryValue = (value: number) => {
        const price = value / rates[primaryCurrency];
        const result = price * rates[secondaryCurrency];
        setSecondaryValue(result);
        setPrimaryValue(value);
    };

    const changeSecondaryValue = (value: number) => {
        const result = (rates[primaryCurrency] / rates[secondaryCurrency]) * value;
        setPrimaryValue(result);
        setSecondaryValue(value);
    };
    const onChangePrimaryCurrency = (cur: string) => {
        setPrimaryCurrency(cur);
        changePrimaryValue(primaryValue)
    }
    const onChangeSecondaryCurrency = (cur: string) => {
        setSecondaryCurrency(cur);
        changeSecondaryValue(secondaryValue)
    }
    const onReplaceCurrency = (value: string, activeTab: 'primary' | 'secondary' = 'primary') => {
        console.log('onReplaceCurrency', value, activeTab);
        setReplacedCurrency(value);

        const indexToReplace = defaultCurrencies.findIndex(curr => {
            if (activeTab === 'primary') {
                return curr === primaryCurrency;
            } else {
                return curr === secondaryCurrency;
            }
        });
        setActiveIndex(indexToReplace !== -1 ? indexToReplace : 0);
        if (activeTab === 'primary') {
            setPrimaryCurrency(value);
        } else {
            setSecondaryCurrency(value);
        }
    }
    console.log('replaced',replacedCurrency)
    useEffect(() => {
        fetch("https://api.frankfurter.app/latest")
            .then((res) => res.json())
            .then((data) => setRates(data.rates))
            .catch((err) => {
                console.warn(err);
                alert("error");
            });
    }, []);
    useEffect(() => {
        if (replacedCurrency !== '') {
            setDefaultCurrencies(prevCurrencies => {
                const newCurrencies = [...prevCurrencies];
                newCurrencies[activeIndex] = replacedCurrency;
                return newCurrencies;
            });
        }
    }, [replacedCurrency, activeIndex])

    useEffect(()=>{
        onChangePrimaryCurrency(primaryCurrency);
    },[primaryCurrency,primaryValue])

    useEffect(()=>{
        onChangeSecondaryCurrency(secondaryCurrency);
    },[secondaryCurrency,secondaryValue])
    return (
        <div className="block-container">
            <Block
                currency={primaryCurrency}
                onChangeCurrency={setPrimaryCurrency}
                onChangeValue={changePrimaryValue}
                value={primaryValue}
                defaultCurrencies={defaultCurrencies}
                dropDownItems={itemsForDropDown}
                onReplaceCurrency={onReplaceCurrency}
                isSecondary={false}
            />
            <div className="divider" />
            <Block
                currency={secondaryCurrency}
                onChangeCurrency={setSecondaryCurrency}
                onChangeValue={changeSecondaryValue}
                value={secondaryValue}
                defaultCurrencies={defaultCurrencies}
                dropDownItems={itemsForDropDown}
                onReplaceCurrency={onReplaceCurrency}
                isSecondary={true}
            />
        </div>
    );
};

export default CurrencyConverter;
