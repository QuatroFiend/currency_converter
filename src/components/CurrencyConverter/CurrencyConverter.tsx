import React from "react";
import { Block } from "../CurrencyBlock/Block.tsx";
import ResultBlock from "../ResultBlock/ResultBlock.tsx";
import CurrencyGrapth from "../CurrencyGrapth/CurrencyGrapth.tsx";
import SplitBar from "../SplitBar/Splitbar.tsx";
import { useCurrencyConverter } from "../../customHooks/useCurrencyConverter/useCurrencyConverter.ts";


const CurrencyConverter: React.FC = () => {
 const {  primaryCurrencies,
    secondaryCurrencies,
    primaryCurrency,
    secondaryCurrency,
    primaryValue,
    secondaryValue,
    itemsForDropDown,
    changePrimaryValue,
    onChangePrimaryCurrency,
    onChangeSecondaryCurrency}=useCurrencyConverter();
  return (
    <>
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
        <SplitBar />
        <ResultBlock
          currency={secondaryCurrency}
          onChangeCurrency={onChangeSecondaryCurrency}
          value={secondaryValue}
          dropDownItems={itemsForDropDown}
          isSecondary={true}
          secondaryCurrencies={secondaryCurrencies}
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
