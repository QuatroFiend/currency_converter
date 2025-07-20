import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useGrapth } from "../../customHooks/useGraph/useGraphData";
import Tabs from "../UI/Tabs/Tabs";

interface CurrencyGraphProps {
  primaryCurrency: string;
  secondaryCurrency: string;
}

export const tabs = ["Week", "Two weeks", "Month", "Year"];

const CurrencyGrapth = ({
  primaryCurrency,
  secondaryCurrency,
}: CurrencyGraphProps) => {
  const [activeTab, setActiveTab] = useState(tabs[1]);
  const onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  const { data, options } = useGrapth({
    primaryCurrency,
    secondaryCurrency,
    activeTab,
  });

  return (
    <div className="relative w-full h-[320px] sm:h-[350px] md:h-[500px] p-4 rounded-lg shadow-md mt-[50px] flex justify-center items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#2f2f2f] rounded-lg z-0" />
      <div className="relative w-full h-full z-10 flex flex-col">
        <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
        <div className="flex-1">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyGrapth;
