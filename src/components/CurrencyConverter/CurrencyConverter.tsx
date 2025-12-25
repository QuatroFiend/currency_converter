import React from "react";
import CurrencyGrapth from "../CurrencyGrapth/CurrencyGrapth.tsx";
import SplitBar from "../SplitBar/Splitbar.tsx";
import { useCurrencyConverter } from "../../customHooks/useCurrencyConverter/useCurrencyConverter.ts";
import CurrencyBlock from "../UI/CurrencyBlock/CurrencyBlock.tsx";
import clsx from "clsx";
import { CryptoRange } from "../CryptoGraph/CryptoGrapth.tsx";

interface CurrencyConverterProps {
  isCryptoMode?: boolean;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  isCryptoMode,
}) => {
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
    primaryCryptoCurrencies,
    secondaryCryptoCurrencies,
    primaryCryptoCurrency,
    secondaryCryptoCurrency,
    primaryCryptoValue,
    secondaryCryptoValue,
    cryptoItemsForDropDown,
    changePrimaryCryptoValue,
    onChangePrimaryCryptoCurrency,
    onChangeSecondaryCryptoCurrency,
  } = useCurrencyConverter();
  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className={clsx(
            "justify-center w-fit flex md:flex-row flex-col md:gap-[50px] gap-[20px] bg-white dark:bg-[#2f2f2f] text-black dark:text-white rounded-[10px] p-6 shadow-[0_4px_10px_5px_rgba(0,0,0,0.1)]"
          )}
        >
          <CurrencyBlock
            value={isCryptoMode ? primaryCryptoValue : primaryValue}
            currency={isCryptoMode ? primaryCryptoCurrency : primaryCurrency}
            onChangeCurrency={
              isCryptoMode
                ? onChangePrimaryCryptoCurrency
                : onChangePrimaryCurrency
            }
            dropDownItems={
              isCryptoMode ? cryptoItemsForDropDown : itemsForDropDown
            }
            isSecondary={false}
            currenciesArray={
              isCryptoMode ? primaryCryptoCurrencies : primaryCurrencies
            }
            onChangeValue={
              isCryptoMode ? changePrimaryCryptoValue : changePrimaryValue
            }
            readonly={false}
          />
          <SplitBar />
          <CurrencyBlock
            value={isCryptoMode ? secondaryCryptoValue : secondaryValue}
            currency={
              isCryptoMode ? secondaryCryptoCurrency : secondaryCurrency
            }
            onChangeCurrency={
              isCryptoMode
                ? onChangeSecondaryCryptoCurrency
                : onChangeSecondaryCurrency
            }
            dropDownItems={
              isCryptoMode ? cryptoItemsForDropDown : itemsForDropDown
            }
            isSecondary={true}
            currenciesArray={
              isCryptoMode ? secondaryCryptoCurrencies : secondaryCurrencies
            }
            readonly={true}
          />
        </div>
      </div>

      {!isCryptoMode ? (
        <CurrencyGrapth
          primaryCurrency={
            isCryptoMode ? primaryCryptoCurrency : primaryCurrency
          }
          secondaryCurrency={
            isCryptoMode ? secondaryCryptoCurrency : secondaryCurrency
          }
        />
      ) : (
        <CryptoRange
          primaryCryptoCurrency={primaryCryptoCurrency}
          secondaryCryptoCurrency={secondaryCryptoCurrency}
        />
      )}
    </>
  );
};

export default CurrencyConverter;
