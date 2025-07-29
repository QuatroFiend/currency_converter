import React from "react";
import { useThemeSwitcher } from "../../customHooks/useThemeSwitcher/useThemeSwithcer";
import clsx from "clsx";
import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeSwitcher();
  return (
    <>
      <button
        onClick={toggleTheme}
        className={clsx(
          "w-[60px] h-[32px] rounded-full px-1 flex items-center bg-[#444]",
          "transition-colors duration-300",
        )}
      >
        {theme === "dark" && <MoonIcon className="size-6 text-white" />}
        <div
          className={clsx(
            "w-[24px] h-[24px] rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
            theme === "dark" ? "translate-x-[3px]" : "translate-x-0"
          )}
        ></div>
        {theme === "light" && <SunIcon className="size-6 text-yellow-300" />}
      </button>
    </>
  );
};

export default ThemeToggle;
