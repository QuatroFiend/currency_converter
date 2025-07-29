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
  } = useCurrencyConverter();
  return (
    <>
      <div
        className={clsx(
          "flex md:flex-row flex-col md:gap-[50px] gap-[20px] bg-white dark:bg-[#2f2f2f] text-black dark:text-white rounded-[10px] p-6 shadow-[0_4px_10px_5px_rgba(0,0,0,0.1)]"
        )}
      >
        <CurrencyBlock
          value={primaryValue}
          currency={primaryCurrency}
          onChangeCurrency={onChangePrimaryCurrency}
          dropDownItems={itemsForDropDown}
          isSecondary={false}
          currenciesArray={primaryCurrencies}
          onChangeValue={changePrimaryValue}
          readonly={false}
        />
        <SplitBar />
        <CurrencyBlock
          value={secondaryValue}
          currency={secondaryCurrency}
          onChangeCurrency={onChangeSecondaryCurrency}
          dropDownItems={itemsForDropDown}
          isSecondary={true}
          currenciesArray={secondaryCurrencies}
          readonly={true}
        />
      </div>
      <CurrencyGrapth
        primaryCurrency={primaryCurrency}
        secondaryCurrency={secondaryCurrency}
      />
    </>
  );
};

export default CurrencyConverter;
