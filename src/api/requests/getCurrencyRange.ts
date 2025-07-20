import { GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";

export const getCurrencyRange = async (
  primaryCurrency: string,
  secondaryCurrency: string,
  activeTab: string
) => {
  const today = new Date();
  const weekRange = new Date(today);
  weekRange.setDate(today.getDate() - 6);
  const twoWeeksRange = new Date(today);
  twoWeeksRange.setDate(today.getDate() - 13);
  const monthRange = new Date(today);
  monthRange.setMonth(today.getMonth() - 1);
  const yearRange = new Date(today);
  yearRange.setFullYear(today.getFullYear() - 1);

  let startDate;

  switch (activeTab) {
    case GRAPTH_RANGE_TABS[0]: 
      startDate = weekRange;
      break;
    case GRAPTH_RANGE_TABS[1]:
      startDate = twoWeeksRange;
      break;
    case GRAPTH_RANGE_TABS[2]:
      startDate = monthRange;
      break;
    case GRAPTH_RANGE_TABS[3]:
      startDate = yearRange;
      break;
    default:
      startDate = weekRange;
      break;
  }

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const res = await fetch(
    `https://api.frankfurter.app/${formatDate(startDate)}..${formatDate(
      today
    )}?from=${primaryCurrency}&to=${secondaryCurrency}`
  );
  try {
    const data = await res.json();
    const dataRates = Object.entries(data.rates).map(([key, value]) => ({
      date: key,
      value: (value as Record<string, number>)[secondaryCurrency],
    }));
    return dataRates;
  } catch (err) {
    console.warn(err);
    alert("Error fetching range.");
  }
};
