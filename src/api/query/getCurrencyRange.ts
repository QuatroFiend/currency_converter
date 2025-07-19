export const getCurrencyRange = async (
    primaryCurrency: string,
    secondaryCurrency: string,
) => {
    const today = new Date();
    const weekRange = new Date(today);
    weekRange.setDate(today.getDate() - 6);

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const res = await fetch(
        `https://api.frankfurter.app/${formatDate(weekRange)}..${formatDate(today)}?from=${primaryCurrency}&to=${secondaryCurrency}`
    )
      try{
        const data = await res.json();
        const dataRates=Object.entries(data.rates).map(([key, value]) => ({
            date:key,
            value:value
        }));
          return dataRates;
      }catch (err){
          console.warn(err);
          alert("Error fetching range.");
      }
}