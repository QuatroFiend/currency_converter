import { useEffect, useState } from "react";
import {
  DEFAULT_PRIMARY_CURRENCIES,
  DEFAULT_PRIMARY_CURRENCY,
  DEFAULT_SECONDARY_CURRENCIES,
  DEFAULT_SECONDARY_CURRENCY,
} from "../../constants/CurrencyConverterVariabels/currencyConverter.constants";
import { recalculateValues } from "../../utils/recalculateValues/recalculateValues";
import { fetchRates } from "../../api/requests/getRates";

export type RatesData = {
  [key: string]: number;
};

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState<RatesData>({});
  const itemsForDropDown = Object.keys(rates);
  const [primaryCurrencies, setPrimaryCurrencies] = useState(
    DEFAULT_PRIMARY_CURRENCIES
  );
  const [secondaryCurrencies, setSecondaryCurrencies] = useState(
    DEFAULT_SECONDARY_CURRENCIES
  );
  const [primaryCurrency, setPrimaryCurrency] = useState(
    DEFAULT_PRIMARY_CURRENCY
  );
  const [secondaryCurrency, setSecondaryCurrency] = useState(
    DEFAULT_SECONDARY_CURRENCY
  );
  const [primaryValue, setPrimaryValue] = useState(1);
  const [secondaryValue, setSecondaryValue] = useState(0);

  const changePrimaryValue = (value: number) => {
    if (!rates[primaryCurrency] || !rates[secondaryCurrency]) return;
    const price = value / rates[primaryCurrency];
    const result = price * rates[secondaryCurrency];
    setSecondaryValue(Number(result.toFixed((result * 100) % 1 === 0 ? 0 : 2)));
    setPrimaryValue(value);
  };

  const onChangePrimaryCurrency = (cur: string) => {
    setPrimaryCurrency(cur);
    recalculateValues(
      cur,
      secondaryCurrency,
      primaryValue,
      rates,
      setSecondaryValue
    );
    if (primaryCurrencies.includes(cur)) return;
    const updated = [...primaryCurrencies];
    const activeIndex = updated.indexOf(primaryCurrency);
    if (activeIndex !== -1) {
      updated[activeIndex] = cur;
    } else {
      updated.unshift(cur);
    }
    const withoutDuplicates = updated.filter(
      (item, index) => updated.indexOf(item) === index
    );
    setPrimaryCurrencies(withoutDuplicates.slice(0, 4));
  };

  const onChangeSecondaryCurrency = (cur: string) => {
    setSecondaryCurrency(cur);
    recalculateValues(
      primaryCurrency,
      cur,
      primaryValue,
      rates,
      setSecondaryValue
    );

    if (secondaryCurrencies.includes(cur)) return;
    const updated = [...secondaryCurrencies];
    const activeIndex = updated.indexOf(secondaryCurrency);
    if (activeIndex !== -1) {
      updated[activeIndex] = cur;
    } else {
      /** if something was wrong, we push to the start  */
      updated.unshift(cur);
    }
    /** delete twins */
    const withoutDuplicates = updated.filter(
      (item, index) => updated.indexOf(item) === index
    );

    setSecondaryCurrencies(withoutDuplicates.slice(0, 4));
  };

  /** fetching currencies */
  useEffect(() => {
    fetchRates(setRates, () =>
      recalculateValues(
        primaryCurrency,
        secondaryCurrency,
        primaryValue || 1,
        rates,
        setSecondaryValue
      )
    );
  }, []);

  /** recount from primary  */
  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      recalculateValues(
        primaryCurrency,
        secondaryCurrency,
        primaryValue,
        rates,
        setSecondaryValue
      );
    }
  }, [primaryCurrency, secondaryCurrency, primaryValue, rates]);

  useEffect(() => {
    setSecondaryValue(secondaryValue);
  }, [secondaryCurrency, secondaryValue]);

  return {
    rates,
    primaryCurrencies,
    secondaryCurrencies,
    primaryCurrency,
    secondaryCurrency,
    primaryValue,
    secondaryValue,
    itemsForDropDown,
    changePrimaryValue,
    onChangePrimaryCurrency,
    onChangeSecondaryCurrency,
  };
};
