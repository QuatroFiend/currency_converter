import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useGrapth } from "../../customHooks/useGraph/useGraphData";
import Tabs from "../UI/Tabs/Tabs";

interface CurrencyGraphProps {
  primaryCurrency: string;
  secondaryCurrency: string;
}

export  const tabs = ["Week", "Two weeks", "Month", "Year"];


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
    <div className="w-full h-full p-4 bg-[#2f2f2f] rounded-lg shadow-md mt-[50px]">
      {/* <h1>Currency rate Graph</h1> */}
      <Tabs tabs={tabs} activeTab={activeTab} onChangeTab={onChangeTab} />
      <Line data={data} options={options} />
    </div>
  );
};

export default CurrencyGrapth;
