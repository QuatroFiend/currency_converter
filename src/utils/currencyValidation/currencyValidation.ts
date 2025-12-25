
export const isSameCurrency = (
  primaryCurrency: string,
  secondaryCurrency: string
): boolean => {
  return primaryCurrency === secondaryCurrency;
};

export const validateDifferentCurrencies = (
  primaryCurrency: string,
  secondaryCurrency: string
): boolean => {
  if (isSameCurrency(primaryCurrency, secondaryCurrency)) {
    console.warn(
      `Same currency selected: ${primaryCurrency}. Please select different currencies.`
    );
    return false;
  }
  return true;
};
