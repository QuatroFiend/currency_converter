import { useEffect, useState } from "react";

export const useThemeDetector = () => {
  const getTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme ?? (systemPrefersDark ? "dark" : "light");
  };

  const [isDarkTheme, setIsDarkTheme] = useState(() => getTheme() === "dark");

  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(getTheme() === "dark");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme") checkTheme();
    };
    window.addEventListener("storage", onStorage);

    const interval = setInterval(() => checkTheme());

    return () => {
      mediaQuery.removeEventListener("change", checkTheme);
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  return isDarkTheme;
};
