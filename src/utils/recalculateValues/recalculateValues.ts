import type { RatesData } from "../../customHooks/useCurrencyConverter/useCurrencyConverter";

export const recalculateValues = (
  primCurrency: string,
  secCurrency: string,
  value: number,
  rates: RatesData,
  setSecondaryValue: (value: number) => void
) => {
  if (
    !rates[primCurrency] ||
    !rates[secCurrency] ||
    Object.keys(rates).length === 0
  )
    return;
  const eurValue = value / rates[primCurrency];
  const result = eurValue * rates[secCurrency];
  const formattedResult = Number(
    result.toFixed((result * 100) % 1 === 0 ? 0 : 2)
  );
  setSecondaryValue(formattedResult);
};

export const recalculateCryptoValues = (
  primaryCur: string,
  secondaryCur: string,
  primaryValue: number,
  cryptoRatesMap: Record<string, number>,
  setSecondaryValue: (value: number) => void
) => {
  const primaryRate = cryptoRatesMap[primaryCur];
  const secondaryRate = cryptoRatesMap[secondaryCur];

  if (!primaryRate || !secondaryRate) {
    console.log("Missing rates in recalculate");
    return;
  }

  const valueInUSDT = primaryValue * primaryRate;
  const result = valueInUSDT / secondaryRate;

  console.log("recalculateCryptoValues:", {
    primaryCur,
    secondaryCur,
    primaryValue,
    primaryRate,
    secondaryRate,
    valueInUSDT,
    result,
  });

  setSecondaryValue(Number(result.toFixed((result * 100) % 1 === 0 ? 0 : 2)));
};
