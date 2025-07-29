import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useGrapth } from "../../customHooks/useGraph/useGraphData";
import Tabs from "../UI/Tabs/Tabs";
import { GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";

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

  return (
    <div className="pb-[50px] relative lg:w-full sm:w-[99%] w-max h-full sm:h-[350px] md:h-[500px] p-4 rounded-lg shadow-[0_4px_10px_6px_rgba(0,0,0,0.1)] mt-[50px] flex justify-center items-center overflow-hidden">
      <div className="bg-white absolute inset-0 dark:bg-[#2f2f2f] rounded-lg z-0" />
      <div className="relative w-full sm:h-full h-[500px] z-9 flex flex-col">
        <Tabs
          tabs={GRAPTH_RANGE_TABS}
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

export default CurrencyGrapth;
