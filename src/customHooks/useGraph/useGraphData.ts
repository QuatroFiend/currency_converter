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
          pointHoverRadius: 15,
          pointBorderColor: isDarkTheme
            ? "#646cffe5"
            : "rgba(108, 255, 108, 0.84)",
        },
      ],
    }),
    [rangeData, primaryCurrency, secondaryCurrency, isDarkTheme]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      pointStyle: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          font: { size: 14 },
          text: `From ${primaryCurrency} to ${secondaryCurrency}`,
          color: isDarkTheme ? "#7e7e7ee5" : "rgba(0, 0, 0, 0.84)",
        },
      },
      scales: {
        x: {
          title: {
            display: false,
            text: "Date",
          },
          ticks: {
            maxRotation: 45,
            minRotation: 30,
            autoSkip: true,
          },
        },
        y: { title: { display: false, text: "Rate" } },
      },
    }),
    [primaryCurrency, secondaryCurrency, isDarkTheme]
  );

  return { data, options };
};
