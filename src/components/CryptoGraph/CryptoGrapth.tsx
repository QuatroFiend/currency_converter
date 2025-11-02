import React, { useState } from "react";
import { useCryptoGraph } from "../../customHooks/useCryptoGraph/useCryptoGraph";
import { Line } from "react-chartjs-2";
import Tabs from "../UI/Tabs/Tabs";
import { CRYPTO_GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";

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
  return (
    <div className="pb-[50px] relative lg:w-full sm:w-[99%] w-max h-full sm:h-[350px] md:h-[500px] p-4 rounded-lg shadow-[0_4px_10px_6px_rgba(0,0,0,0.1)] mt-[50px] flex justify-center items-center overflow-hidden">
      <div className="bg-white absolute inset-0 dark:bg-[#2f2f2f] rounded-lg z-0" />
      <div className="relative w-full sm:h-full h-[500px] z-9 flex flex-col">
        <Tabs
          tabs={CRYPTO_GRAPTH_RANGE_TABS}
          activeTab={activeTab}
          onChangeTab={onChangeTab}
        />
        <div className="flex-1">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
