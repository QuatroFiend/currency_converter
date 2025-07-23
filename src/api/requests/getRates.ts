export const fetchRates = async (
  setRates: (rates: Record<string, number>) => void,
  recalculate: () => void
) => {
  try {
    const res = await fetch("https://api.frankfurter.app/latest");
    const data = await res.json();
    const updatedRates = { ...data.rates };
    setRates(updatedRates);
    setTimeout(recalculate, 0);
  } catch (err) {
    console.warn(err);
    alert("Error fetching rates.");
  }
};
