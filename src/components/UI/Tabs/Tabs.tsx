import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChangeTab }: TabsProps) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const idx = tabs.indexOf(activeTab);
    const currentTab = tabRefs.current[idx];
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="relative bg-transparent flex justify-around items-center p-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          className={clsx(
            activeTab === tab ? "text-[#646cffe5] font-bold" : "text-white",
            "bg-transparent rounded-lg hover:text-[#646cffe5] transition-colors duration-600 flex items-center justify-center text-lg px-4 py-2"
          )}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
      <span
        className="absolute bottom-0 h-[2px] bg-[#646cffe5] transition-all duration-300"
        style={{
          ...underlineStyle,
          position: "absolute",
        }}
      />
    </div>
  );
};

export default Tabs;
