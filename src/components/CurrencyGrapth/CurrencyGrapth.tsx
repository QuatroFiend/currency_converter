import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useGrapth } from "../../customHooks/useGraph/useGraphData";
import Tabs from "../UI/Tabs/Tabs";
import { GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";
import { isSameCurrency } from "../../utils/currencyValidation/currencyValidation";

interface CurrencyGraphProps {
  primaryCurrency: string;
  secondaryCurrency: string;
}

const CurrencyGrapth = ({
  primaryCurrency,
  secondaryCurrency,
}: CurrencyGraphProps) => {
  const [activeTab, setActiveTab] = useState(GRAPTH_RANGE_TABS[1]);
  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  const { data, options } = useGrapth({
    primaryCurrency,
    secondaryCurrency,
    activeTab,
  });

  const areSameCurrencies = isSameCurrency(primaryCurrency, secondaryCurrency);

  return (
    <div className="pb-[50px] relative w-full max-w-full h-full min-h-[350px] sm:h-[350px] md:h-[500px] p-2 sm:p-4 rounded-lg shadow-[0_4px_10px_6px_rgba(0,0,0,0.1)] mt-[30px] sm:mt-[50px] flex justify-center items-center overflow-hidden">
      <div className="bg-white absolute inset-0 dark:bg-[#2f2f2f] rounded-lg z-0" />
      <div className="relative w-full h-full z-10 flex flex-col min-h-0">
        <Tabs
          tabs={GRAPTH_RANGE_TABS}
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

export default CurrencyGrapth;
