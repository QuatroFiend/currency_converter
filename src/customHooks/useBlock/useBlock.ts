import { useEffect, useRef, useState } from "react";
import { adjustVisibleCurrencies } from "../../utils/adjustVisibleCurrencies/adjustVisibleCurrencies";
import { useMediaQuery } from "../useIsMobile/useMedia";

export const useBlock = (currency: string, secondaryCurrencies: string[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  const flexibleCurrenciesArray = adjustVisibleCurrencies(
    currency,
    secondaryCurrencies,
    useMediaQuery(860)
  );

  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (
         blockRef.current &&
         !blockRef.current.contains(event.target as Node)
       ) {
         setIsOpen(false);
       }
     };
     document.addEventListener("mousedown", handleClickOutside);
     return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

  return { isOpen, toggleDropDown,flexibleCurrenciesArray,blockRef };
}