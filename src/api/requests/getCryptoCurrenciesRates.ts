export const fetchCryptoCurrenciesRates = async (
  setCryptoRates: (data: CryptoCurrencyType[]) => void,
  recalculate: () => void
) => {
  const res = await fetch(`https://api.binance.com/api/v3/ticker/price`);
  try {
    const data = await res.json();
    console.log('Raw crypto API data:', data);

    const currencies: CryptoCurrencyType[] = [];

    // Сначала добавляем USDT как базовую валюту с ценой 1
    currencies.push({
      symbol: "USDT",
      price: 1
    });

    data.forEach((item: { symbol: string; price: string }) => {
      const symbol = item.symbol;
      const price = item.price;
      if (symbol.endsWith("USDT")) {
        currencies.push({
          symbol: symbol.replace("USDT", ""),
          price: Number(price),
        });
      }
    });

    console.log('Processed crypto currencies:', currencies);
    setCryptoRates(currencies);
    setTimeout(recalculate, 0);
  } catch (err) {
    console.warn(err);
    alert("Error fetching rates.");
  }
};

export type CryptoCurrencyType = {
  symbol: string;
  price: number;
};