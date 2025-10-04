import React from "react";
import CurrencyGrapth from "../CurrencyGrapth/CurrencyGrapth.tsx";
import SplitBar from "../SplitBar/Splitbar.tsx";
import { useCurrencyConverter } from "../../customHooks/useCurrencyConverter/useCurrencyConverter.ts";
import CurrencyBlock from "../UI/CurrencyBlock/CurrencyBlock.tsx";
import clsx from "clsx";

const CurrencyConverter: React.FC = () => {
  const {
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
  } = useCurrencyConverter();
  console.log(cryptoRates);
  const cryptoItemsForDropDown = cryptoRates.map((rate) => rate.symbol);
  const thisIsTest = true;
  return (
    <>
      <div
        className={clsx(
          "flex md:flex-row flex-col md:gap-[50px] gap-[20px] bg-white dark:bg-[#2f2f2f] text-black dark:text-white rounded-[10px] p-6 shadow-[0_4px_10px_5px_rgba(0,0,0,0.1)]"
        )}
      >
        <CurrencyBlock
          value={thisIsTest ? primaryValue : primaryCryptoValue}
          currency={thisIsTest ? primaryCurrency : primaryCryptoCurrency}
          onChangeCurrency={
            thisIsTest ? onChangePrimaryCurrency : onChangePrimaryCryptoCurrency
          }
          dropDownItems={thisIsTest ? itemsForDropDown : cryptoItemsForDropDown}
          isSecondary={false}
          currenciesArray={
            thisIsTest ? primaryCurrencies : primaryCryptoCurrencies
          }
          onChangeValue={
            thisIsTest ? changePrimaryValue : changePrimaryCryptoValue
          }
          readonly={false}
        />
        <SplitBar />
        <CurrencyBlock
          value={thisIsTest ? secondaryValue : secondaryCryptoValue}
          currency={thisIsTest ? secondaryCurrency : secondaryCryptoCurrency}
          onChangeCurrency={
            thisIsTest
              ? onChangeSecondaryCurrency
              : onChangeSecondaryCryptoCurrency
          }
          dropDownItems={thisIsTest ? itemsForDropDown : cryptoItemsForDropDown}
          isSecondary={true}
          currenciesArray={
            thisIsTest ? secondaryCurrencies : secondaryCryptoCurrencies
          }
          readonly={true}
        />
      </div>
      <CurrencyGrapth
        primaryCurrency={thisIsTest ? primaryCurrency : primaryCryptoCurrency}
        secondaryCurrency={
          thisIsTest ? secondaryCurrency : secondaryCryptoCurrency
        }
      />
    </>
  );
};

export default CurrencyConverter;
