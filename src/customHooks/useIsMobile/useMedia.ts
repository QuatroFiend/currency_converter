import { useEffect, useState } from "react";

export const useMediaQuery = (breakpoint: number): boolean => {
  const query = `(max-width: ${breakpoint}px)`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    const updateMatch = () => setMatches(mediaQuery.matches);
    updateMatch();

    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
};
