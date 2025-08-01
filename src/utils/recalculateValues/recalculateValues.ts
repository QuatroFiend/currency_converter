import type { RatesData } from "../../customHooks/useCurrencyConverter/useCurrencyConverter";

export const recalculateValues = (
    primCurrency: string, 
    secCurrency: string, 
    value: number,
    rates:RatesData,
    setSecondaryValue: (value: number) => void
) => {
    if (!rates[primCurrency] || !rates[secCurrency] || Object.keys(rates).length === 0) return;
    const eurValue = value / rates[primCurrency];
    const result = eurValue * rates[secCurrency];
    const formattedResult = Number(result.toFixed(result * 100 % 1 === 0 ? 0 : 2));
    setSecondaryValue(formattedResult);
};