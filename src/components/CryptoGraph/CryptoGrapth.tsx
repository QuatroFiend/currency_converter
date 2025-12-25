import React, { useState } from "react";
import { useCryptoGraph } from "../../customHooks/useCryptoGraph/useCryptoGraph";
import { Line } from "react-chartjs-2";
import Tabs from "../UI/Tabs/Tabs";
import { CRYPTO_GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";
import { isSameCurrency } from "../../utils/currencyValidation/currencyValidation";

interface CryptoRangeProps {
  primaryCryptoCurrency: string;
  secondaryCryptoCurrency: string;
}

export const CryptoRange = ({
  primaryCryptoCurrency,
  secondaryCryptoCurrency,
}: CryptoRangeProps) => {
  const [activeTab, setActiveTab] = useState(CRYPTO_GRAPTH_RANGE_TABS[0]);

  const { data, options } = useCryptoGraph({
    primaryCryptoCurrency,
    secondaryCryptoCurrency,
    activeTab,
  });
  console.log('symbol',primaryCryptoCurrency,secondaryCryptoCurrency);
  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };

  const areSameCurrencies = isSameCurrency(primaryCryptoCurrency, secondaryCryptoCurrency);

  return (
    <div className="pb-[50px] relative w-full max-w-full h-full min-h-[350px] sm:h-[350px] md:h-[500px] p-2 sm:p-4 rounded-lg shadow-[0_4px_10px_6px_rgba(0,0,0,0.1)] mt-[30px] sm:mt-[50px] flex justify-center items-center overflow-hidden">
      <div className="bg-white absolute inset-0 dark:bg-[#2f2f2f] rounded-lg z-0" />
      <div className="relative w-full h-full z-10 flex flex-col min-h-0">
        <Tabs
          tabs={CRYPTO_GRAPTH_RANGE_TABS}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />
        <div className="flex-1">
          {areSameCurrencies ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p className="text-center px-4">
                Please select different currencies to view the exchange rate graph
              </p>
            </div>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};
