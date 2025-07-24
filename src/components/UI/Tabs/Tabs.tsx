import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { useMedia } from "../../../customHooks/useIsMobile/useMedia";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onChangeTab }: TabsProps) => {
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isMobile = useMedia(480);

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

  console.log(isMobile);
  
  const mobileTabs = (
    <div className="relative grid grid-cols-2 gap-2 pb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          className={clsx(
            activeTab === tab ? "dark:text-[#646cffe5] font-bold" : "dark:text-white",
            "bg-transparent rounded-lg hover:text-[#646cffe5] transition-colors duration-300 flex items-center justify-center text-lg px-4 py-2"
          )}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
      <span
        className="absolute h-[2px] bg-[#646cffe5] transition-all duration-300"
        style={{
          ...underlineStyle,
          position: "absolute",
        }}
      />
    </div>
  );

  const desktopTabs = (
    <div className="relative flex justify-around items-center pb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          ref={(el) => {
            tabRefs.current[idx] = el;
          }}
          className={clsx(
            activeTab === tab ? "text-green-500 dark:text-[#646cffe5] font-bold" : "text-black dark:text-white",
            "bg-transparent rounded-lg hover:text-green-400 dark:hover:text-[#646cffe5] transition-colors duration-300 flex items-center justify-center lg:text-[18px] text-[16px] px-4 py-2"
          )}
          onClick={() => onChangeTab(tab)}
        >
          {tab}
        </button>
      ))}
      <span
        className="absolute bottom-0 h-[2px] bg-green-500 dark:bg-[#646cffe5] transition-all duration-300"
        style={{
          ...underlineStyle,
          position: "absolute",
        }}
      />
    </div>
  );

  return isMobile ? mobileTabs : desktopTabs;
};

export default Tabs;
