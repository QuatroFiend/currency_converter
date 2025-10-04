import { useEffect, useState } from "react";
import {
  DEFAULT_PRIMARY_CRYPTO_CURRENCIES,
  DEFAULT_PRIMARY_CRYPTO_CURRENCY,
  DEFAULT_PRIMARY_CURRENCIES,
  DEFAULT_PRIMARY_CURRENCY,
  DEFAULT_SECONDARY_CRYPTO_CURRENCIES,
  DEFAULT_SECONDARY_CRYPTO_CURRENCY,
  DEFAULT_SECONDARY_CURRENCIES,
  DEFAULT_SECONDARY_CURRENCY,
} from "../../constants/CurrencyConverterVariabels/currencyConverter.constants";
import {
  recalculateCryptoValues,
  recalculateValues,
} from "../../utils/recalculateValues/recalculateValues";
import { fetchRates } from "../../api/requests/getRates";
import {
  fetchCryptoCurrenciesRates,
  type CryptoCurrencyType,
} from "../../api/requests/getCryptoCurrenciesRates";

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

  /** CRYPTO CURRENCIES */

  const [cryptoRates, setCryptoRates] = useState<CryptoCurrencyType[]>([]);
  /** fetching crypto currencies */
  const [primaryCryptoCurrencies, setPrimaryCryptoCurrencies] = useState(
    DEFAULT_PRIMARY_CRYPTO_CURRENCIES
  );
  const [secondaryCryptoCurrencies, setSecondaryCryptoCurrencies] = useState(
    DEFAULT_SECONDARY_CRYPTO_CURRENCIES
  );
  const [primaryCryptoCurrency, setPrimaryCryptoCurrency] = useState(
    DEFAULT_PRIMARY_CRYPTO_CURRENCY
  );
  const [secondaryCryptoCurrency, setSecondaryCryptoCurrency] = useState(
    DEFAULT_SECONDARY_CRYPTO_CURRENCY
  );
  const [primaryCryptoValue, setPrimaryCryptoValue] = useState(1);
  const [secondaryCryptoValue, setSecondaryCryptoValue] = useState(0);

  const changePrimaryCryptoValue = (value: number) => {
    console.log("changePrimaryCryptoValue called", {
      value,
      primaryCryptoCurrency,
      secondaryCryptoCurrency,
    });
    console.log("cryptoRates:", cryptoRates);

    const primaryRateObj = cryptoRates.find(
      (rate) => rate.symbol === primaryCryptoCurrency
    );
    const secondaryRateObj = cryptoRates.find(
      (rate) => rate.symbol === secondaryCryptoCurrency
    );

    console.log("Found rates:", { primaryRateObj, secondaryRateObj });

    if (!primaryRateObj || !secondaryRateObj) {
      console.log(
        "Missing rate objects - available:",
        cryptoRates.map((r) => r.symbol)
      );
      return;
    }

    //** convert value from primary currency to USDT */
    const valueInUSDT = value * primaryRateObj.price;

    //** convert USDT to secondary currency */
    const result = valueInUSDT / secondaryRateObj.price;

    console.log("Calculation:", {
      value,
      primaryCurrency: primaryCryptoCurrency,
      secondaryCurrency: secondaryCryptoCurrency,
      primaryRate: primaryRateObj.price,
      secondaryRate: secondaryRateObj.price,
      valueInUSDT, // добавьте эту строку чтобы видеть промежуточное значение
      result,
    });

    setSecondaryCryptoValue(
      Number(result.toFixed((result * 100) % 1 === 0 ? 0 : 2))
    );
    setPrimaryCryptoValue(value);
  };

  const onChangePrimaryCryptoCurrency = (cur: string) => {
    setPrimaryCryptoCurrency(cur);
    recalculateCryptoValues(
      cur,
      secondaryCryptoCurrency,
      primaryCryptoValue,
      cryptoRates.reduce((acc, rate) => {
        acc[rate.symbol] = rate.price;
        return acc;
      }, {} as Record<string, number>),
      setSecondaryCryptoValue
    );
    if (primaryCryptoCurrencies.includes(cur)) return;
    const updated = [...primaryCryptoCurrencies];
    const activeIndex = updated.indexOf(primaryCryptoCurrency);
    if (activeIndex !== -1) {
      updated[activeIndex] = cur;
    } else {
      updated.unshift(cur);
    }
    const withoutDuplicates = updated.filter(
      (item, index) => updated.indexOf(item) === index
    );
    setPrimaryCryptoCurrencies(withoutDuplicates.slice(0, 4));
  };

  const onChangeSecondaryCryptoCurrency = (cur: string) => {
    setSecondaryCryptoCurrency(cur);
    recalculateCryptoValues(
      primaryCryptoCurrency,
      cur,
      primaryCryptoValue,
      cryptoRates.reduce((acc, rate) => {
        acc[rate.symbol] = rate.price;
        return acc;
      }, {} as Record<string, number>),
      setSecondaryCryptoValue
    );

    if (secondaryCryptoCurrencies.includes(cur)) return;
    const updated = [...secondaryCryptoCurrencies];
    const activeIndex = updated.indexOf(secondaryCryptoCurrency);
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

    setSecondaryCryptoCurrencies(withoutDuplicates.slice(0, 4));
  };
  useEffect(() => {
    fetchCryptoCurrenciesRates(setCryptoRates, () => {
      // Callback будет вызван после установки данных
    });
  }, []);

  // Отдельный useEffect для пересчета когда криптоданные загрузились
  useEffect(() => {
    if (cryptoRates.length > 0) {
      const cryptoRatesMap = cryptoRates.reduce((acc, rate) => {
        acc[rate.symbol] = rate.price;
        return acc;
      }, {} as Record<string, number>);

      recalculateCryptoValues(
        primaryCryptoCurrency,
        secondaryCryptoCurrency,
        primaryCryptoValue || 1,
        cryptoRatesMap,
        setSecondaryCryptoValue
      );
    }
  }, [
    cryptoRates,
    primaryCryptoCurrency,
    secondaryCryptoCurrency,
    primaryCryptoValue,
  ]);
  useEffect(() => {
    setSecondaryCryptoValue(secondaryCryptoValue);
  }, [secondaryCryptoCurrency, secondaryCryptoValue]);
  /** END OF CRYPTO CURRENCIES */

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
    cryptoRates,
    primaryCryptoCurrencies,
    secondaryCryptoCurrencies,
    primaryCryptoCurrency,
    secondaryCryptoCurrency,
    primaryCryptoValue,
    secondaryCryptoValue,
    changePrimaryCryptoValue,
    onChangePrimaryCryptoCurrency,
    onChangeSecondaryCryptoCurrency,
  };
};
