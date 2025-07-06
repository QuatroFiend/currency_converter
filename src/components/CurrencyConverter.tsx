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
    const [secondaryCurrencies,setSecondaryCurrencies]=useState(['PLN','BRL','CAD','DKK']);
    const [primaryCurrency, setPrimaryCurrency] = useState(primaryCurrencies[0]);
    const [secondaryCurrency, setSecondaryCurrency] = useState(secondaryCurrencies[0]);
    const [primaryValue, setPrimaryValue] = useState(0);
    const [secondaryValue, setSecondaryValue] = useState(0);
    
    const [replacedCurrency, setReplacedCurrency] = useState('')
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    const changePrimaryValue = (value: number) => {
        if (!rates[primaryCurrency] || !rates[secondaryCurrency]) return;

        const price = value / rates[primaryCurrency];
        const result = price * rates[secondaryCurrency];
        setSecondaryValue(Number(result.toFixed(result*100%1 === 0 ? 0 : 2)));
        setPrimaryValue(value);
    };

    const onChangePrimaryCurrency = (cur: string) => {
        setPrimaryCurrency(cur);
        recalculateValues(cur, secondaryCurrency, primaryValue);
    };

   
    const onChangeSecondaryCurrency = (cur: string) => {
        setSecondaryCurrency(cur);
        recalculateValues(primaryCurrency, cur, primaryValue);
    };
    
    const recalculateValues = (primCurrency: string, secCurrency: string, value: number) => {
        if (!rates[primCurrency] || !rates[secCurrency] || Object.keys(rates).length === 0) return;

     
        const eurValue = value / rates[primCurrency];

        const result = eurValue * rates[secCurrency];

        const formattedResult = Number(result.toFixed(result*100%1 === 0 ? 0 : 2));
        
        setSecondaryValue(formattedResult);
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
                alert("Ошибка загрузки курсов валют");
            });
    }, []);

    /** recount from primary  */
    useEffect(()=>{
        if (Object.keys(rates).length > 0) {
            recalculateValues(primaryCurrency, secondaryCurrency, primaryValue);
        }
    },[primaryCurrency, primaryValue]);

    /** recount from secondary */
    useEffect(()=>{
        if (Object.keys(rates).length > 0) {
            recalculateValues(primaryCurrency, secondaryCurrency, primaryValue);
        }
    },[secondaryCurrency]);

    
    useEffect(()=>{
        setSecondaryValue(secondaryValue);
    },[secondaryCurrency,secondaryValue])
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
            <div className="divider" />
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
