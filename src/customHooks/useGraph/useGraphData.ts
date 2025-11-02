import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { getCurrencyRange } from "../../api/requests/getCurrencyRange";
import { useThemeDetector } from "../useThemeDetector/useThemeDetector";

interface GrathProps {
  primaryCurrency: string;
  secondaryCurrency: string;
  activeTab: string;
}

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const useGrapth = ({
  primaryCurrency,
  secondaryCurrency,
  activeTab,
}: GrathProps) => {
  const [rangeData, setRangeData] = useState<{ date: string; value: number }[]>(
    []
  );

  const isDarkTheme = useThemeDetector();

  useEffect(() => {
    const fetchRange = async () => {
      const data = await getCurrencyRange(
        primaryCurrency,
        secondaryCurrency,
        activeTab
      );
      setRangeData(data ?? []);
    };
    fetchRange();
  }, [primaryCurrency, secondaryCurrency, activeTab]);

  const data = useMemo(
    () => ({
      labels: rangeData.map((item) => item.date),
      datasets: [
        {
          label: `${primaryCurrency} to ${secondaryCurrency}`,
          data: rangeData.map((item) => item.value),
          borderColor: isDarkTheme ? "#646cffe5" : "rgba(108, 255, 108, 0.84)",

          backgroundColor: (context: any) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            return gradient;
          },

          borderWidth: 2,
          pointRadius: 1,
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
    }),
    [rangeData, primaryCurrency, secondaryCurrency, isDarkTheme]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          font: { size: 14 },
          text: `${primaryCurrency} to ${secondaryCurrency}`,
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
              return `${context.parsed.y.toFixed(2)} ${secondaryCurrency}`;
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
            maxTicksLimit: 12,
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
    [primaryCurrency, secondaryCurrency, isDarkTheme]
  );

  return { data, options };
};
