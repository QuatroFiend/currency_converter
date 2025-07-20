import React from "react";

const SplitBar = () => {
  return (
    <>
      <div className="md:flex hidden w-[2px] h-[140px] bg-[#444]" />
      <div className="md:hidden flex  w-full h-[2px] bg-[#444]" />
    </>
  );
};

export default SplitBar;