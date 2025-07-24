import React from "react";
import { useThemeSwitcher } from "../../customHooks/useThemeSwitcher/useThemeSwithcer";
import { Moon } from "../UI/Icons/Moon";
import { Sun } from "../UI/Icons/Sun";
import clsx from "clsx";

const ThemeToggle = () => {
  const { toggleTheme, theme } = useThemeSwitcher();
  return (
    <>
      <button
        onClick={toggleTheme}
        className={clsx(
          "w-[60px] h-[32px] rounded-full px-1 flex items-center bg-gray-800",
          "transition-colors duration-300",
        )}
      >
        {theme === "dark" && <Moon />}
        <div
          className={clsx(
            "w-[24px] h-[24px] rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300",
            theme === "dark" ? "translate-x-[3px]" : "translate-x-0"
          )}
        ></div>
        {theme === "light" && <Sun />}
      </button>
    </>
  );
};

export default ThemeToggle;
