import { useEffect, useMemo, useState } from "react";
import {
  getCryptoCurrenciesRange,
  type CandlestickData,
} from "../../api/requests/getCryptoCurrenciesRange";
import { useThemeDetector } from "../useThemeDetector/useThemeDetector";

interface GraphProps {
  primaryCryptoCurrency: string;
  secondaryCryptoCurrency: string;
  activeTab: string;
}

export const useCryptoGraph = ({
  primaryCryptoCurrency,
  secondaryCryptoCurrency,
  activeTab,
}: GraphProps) => {
  const [stats, setStats] = useState<CandlestickData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRange = async () => {
      setLoading(true);
      try {
        const data = await getCryptoCurrenciesRange(
          primaryCryptoCurrency,
          secondaryCryptoCurrency,
          activeTab
        );
        setStats(data);
      } catch (error) {
        console.error("Error in useCryptoGraph:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRange();
  }, [primaryCryptoCurrency, secondaryCryptoCurrency, activeTab]);

  const isDarkTheme = useThemeDetector();

  const data = useMemo(() => {
    const labels = stats.map((item) => {
      const date = new Date(item.time);

      if (activeTab === "24h") {
        return date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else if (activeTab === "Year") {
        return date.toLocaleDateString("en-US", {
          month: "short",
        });
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    });

    const prices = stats.map((item) => item.close);
    const isPositive =
      prices.length > 0 && prices[prices.length - 1] >= prices[0];

    return {
      labels,
      datasets: [
        {
          label: `${primaryCryptoCurrency}/${secondaryCryptoCurrency}`,
          data: prices,
          borderColor: isDarkTheme ? "#646cffe5" : "rgba(108, 255, 108, 0.84)",

          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            if (isPositive) {
              gradient.addColorStop(
                0,
                isDarkTheme
                  ? "rgba(16, 185, 129, 0.3)"
                  : "rgba(16, 185, 129, 0.2)"
              );
              gradient.addColorStop(1, "rgba(16, 185, 129, 0)");
            } else {
              gradient.addColorStop(
                0,
                isDarkTheme
                  ? "rgba(239, 68, 68, 0.3)"
                  : "rgba(239, 68, 68, 0.2)"
              );
              gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
            }
            return gradient;
          },
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: isDarkTheme
            ? "#646cffe3"
            : "rgba(108, 255, 108, 0.84)",
          pointHoverBorderColor: isDarkTheme
            ? "rgba(71, 72, 97, 1)"
            : "rgba(86, 173, 86, 0.84)",
          pointHoverBorderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }, [
    stats,
    primaryCryptoCurrency,
    secondaryCryptoCurrency,
    isDarkTheme,
    activeTab,
  ]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          font: { size: 14 },
          text: `${primaryCryptoCurrency} to ${secondaryCryptoCurrency}`,
          color: isDarkTheme ? "#9ca3af" : "rgba(0, 0, 0, 0.84)",
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
          backgroundColor: isDarkTheme
            ? "rgba(17, 24, 39, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          titleColor: isDarkTheme ? "#fff" : "#000",
          bodyColor: isDarkTheme ? "#fff" : "#000",
          borderColor: isDarkTheme ? "#646cff" : "rgba(108, 255, 108, 0.84)",
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            label: (context: any) => {
              return `${context.parsed.y.toFixed(
                6
              )} ${secondaryCryptoCurrency}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: isDarkTheme ? "#9ca3af" : "rgba(0, 0, 0, 0.6)",
            maxRotation: 45,
            minRotation: 30,
            autoSkip: true,
            maxTicksLimit: 10,
          },
        },
        y: {
          position: "right" as const,
          grid: {
            color: isDarkTheme ? "rgba(75, 85, 99, 0.2)" : "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: isDarkTheme ? "#9ca3af" : "rgba(0, 0, 0, 0.6)",
            callback: (value: any) => value.toFixed(6),
          },
        },
      },
      interaction: {
        mode: "nearest" as const,
        axis: "x" as const,
        intersect: false,
      },
    }),
    [primaryCryptoCurrency, secondaryCryptoCurrency, isDarkTheme]
  );

  return { data, options };
};
