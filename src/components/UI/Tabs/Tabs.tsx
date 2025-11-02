import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { useMediaQuery } from "../../../customHooks/useIsMobile/useMedia";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChangeTab }: TabsProps) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isMobile = useMediaQuery(767);

  useEffect(() => {
    const idx = tabs.indexOf(activeTab);
    const currentTab = tabRefs.current[idx];
    if (currentTab) {
      setUnderlineStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
        top: currentTab.offsetTop + currentTab.offsetHeight - 2,
      });
    }
  }, [activeTab, tabs, isMobile]);

  const mobileTabs = (
    <div className="relative grid grid-cols-2 gap-2 pb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          className={clsx(
            "bg-transparent rounded-lg transition-colors duration-300 flex items-center justify-center lg:text-[18px] text-[16px] px-4 py-2 w-full",
            activeTab === tab
              ? "text-green-500 dark:text-[#646cffe5] font-bold [text-shadow:0_0_10px_rgba(34,197,94,0.5)] dark:[text-shadow:0_0_15px_rgba(100,108,255,0.6)]"
              : "text-black dark:text-white hover:text-green-400 dark:hover:text-[#646cffe5] hover:[text-shadow:0_0_8px_rgba(34,197,94,0.3)] dark:hover:[text-shadow:0_0_12px_rgba(100,108,255,0.4)]"
          )}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
      <span
        className="absolute bottom-0 h-[3px] bg-gradient-to-r from-green-400 via-green-500 to-green-400 dark:from-[#646cff] dark:via-[#646cffe5] dark:to-[#646cff] shadow-[0_0_10px_rgba(34,197,94,0.6),0_2px_15px_rgba(34,197,94,0.4)] dark:shadow-[0_0_15px_rgba(100,108,255,0.6),0_2px_20px_rgba(100,108,255,0.4)] rounded-full transition-all duration-300"
        style={underlineStyle}
      />
    </div>
  );

  const desktopTabs = (
    <div className="relative flex justify-between items-center pb-4 px-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          className={clsx(
            "bg-transparent rounded-lg transition-all duration-300 flex items-center justify-center lg:text-[18px] text-[16px] px-6 py-2",
            activeTab === tab
              ? "text-green-500 dark:text-[#646cffe5] font-bold scale-105 [text-shadow:0_0_15px_rgba(34,197,94,0.7),0_0_30px_rgba(34,197,94,0.4)] dark:[text-shadow:0_0_20px_rgba(100,108,255,0.8),0_0_40px_rgba(100,108,255,0.5)]"
              : "text-black dark:text-white hover:text-green-400 dark:hover:text-[#646cffe5] hover:scale-105 hover:[text-shadow:0_0_10px_rgba(34,197,94,0.4)] dark:hover:[text-shadow:0_0_15px_rgba(100,108,255,0.5)]"
          )}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
      <span
        className="absolute bottom-0 h-[3px] bg-gradient-to-r from-green-400 via-green-500 to-green-400 dark:from-[rgba(100,108,255,0.4)] dark:via-[rgba(100,108,255,0.9)] dark:to-[rgba(100,108,255,0.4)] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.8),0_0_30px_rgba(34,197,94,0.5),0_4px_20px_rgba(34,197,94,0.3)] dark:shadow-[0_0_20px_rgba(100,108,255,0.9),0_0_40px_rgba(100,108,255,0.6),0_4px_25px_rgba(100,108,255,0.4)] animate-pulse"
        style={underlineStyle}
      />
    </div>
  );

  return isMobile ? mobileTabs : desktopTabs;
};

export default Tabs;
