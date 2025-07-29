import React from "react";

const SplitBar = () => {
  return (
    <>
      <div className="md:flex hidden w-[2px] h-[160px] bg-[#444] my-[10px]" />
      <div className="md:hidden flex  w-full h-[2px] bg-[#444]" />
    </>
  );
};

export default SplitBar;