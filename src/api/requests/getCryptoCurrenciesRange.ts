import { CRYPTO_GRAPTH_RANGE_TABS } from "../../constants/CurrencyGrapthVariabels/CurrencyGrapth.constants";

export type CandlestickData = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export const getCryptoCurrenciesRange = async (
  primaryCryptoCurrency: string,
  secondaryCryptoCurrency: string,
  activeTab: string
): Promise<CandlestickData[]> => {
  let interval: string;
  let limit: number;

  switch (activeTab) {
    case CRYPTO_GRAPTH_RANGE_TABS[0]: // 1 Day
      interval = "15m";
      limit = 96;
      break;
    case CRYPTO_GRAPTH_RANGE_TABS[1]: // 3 Days
      interval = "1h";
      limit = 72;
      break;
    case CRYPTO_GRAPTH_RANGE_TABS[2]: // 1 Month
      interval = "4h";
      limit = 180;
      break;
    case CRYPTO_GRAPTH_RANGE_TABS[3]: // 3 Months
      interval = "1d";
      limit = 90;
      break;
    case CRYPTO_GRAPTH_RANGE_TABS[4]: // 1 Year
      interval = "1w";
      limit = 52;
      break;
    default:
      interval = "1h";
      limit = 24;
      break;
  }

  try {
    if (secondaryCryptoCurrency === "USDT") {
      const symbol = `${primaryCryptoCurrency}USDT`;
      const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data.map((item: any[]) => ({
        time: item[0],
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
        volume: parseFloat(item[5]),
      }));
    }

    const primarySymbol = `${primaryCryptoCurrency}USDT`;
    const secondarySymbol = `${secondaryCryptoCurrency}USDT`;

    const [primaryRes, secondaryRes] = await Promise.all([
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${primarySymbol}&interval=${interval}&limit=${limit}`
      ),
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${secondarySymbol}&interval=${interval}&limit=${limit}`
      ),
    ]);

    if (!primaryRes.ok || !secondaryRes.ok) {
      throw new Error(
        `HTTP error! Primary: ${primaryRes.status}, Secondary: ${secondaryRes.status}`
      );
    }

    const primaryData = await primaryRes.json();
    const secondaryData = await secondaryRes.json();

    return primaryData.map((item: any[], index: number) => {
      const primaryPrice = parseFloat(item[4]);
      const secondaryPrice = parseFloat(secondaryData[index][4]);
      const ratio = primaryPrice / secondaryPrice;

      return {
        time: item[0],
        open: parseFloat(item[1]) / parseFloat(secondaryData[index][1]),
        high: parseFloat(item[2]) / parseFloat(secondaryData[index][2]),
        low: parseFloat(item[3]) / parseFloat(secondaryData[index][3]),
        close: ratio,
        volume: parseFloat(item[5]),
      };
    });
  } catch (err) {
    console.error("Error fetching chart data:", err);
    return [];
  }
};
