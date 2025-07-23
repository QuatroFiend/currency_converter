
export const adjustVisibleCurrencies = (
  currency: string,
  arrayOfCurrencies: string[],
  isMobile: boolean
) => {
  let flexibleCurrenciesArray = isMobile
    ? arrayOfCurrencies.slice(0, 3)
    : arrayOfCurrencies.slice(0, 4);

  if (isMobile && !flexibleCurrenciesArray.includes(currency)) {
    flexibleCurrenciesArray[0] = currency;
  }
  return flexibleCurrenciesArray;
};
