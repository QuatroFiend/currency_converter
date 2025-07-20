import { useEffect, useState } from "react";
import { getCurrencyRange } from "../../api/query/getCurrencyRange";
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
  const data = {
    labels: rangeData.map((item) => item.date),
    datasets: [
      {
        label: `${primaryCurrency} to ${secondaryCurrency}`,
        data: rangeData.map((item) => item.value),
        borderColor: "#646cffe5",
        // backgroundColor:  "rgba(129, 135, 255, 0.95)",
        // pointStyle: "circle",
        // pointRadius: 10,
        pointHoverRadius: 15,
        pointBorderColor: "#646cffe5",
        //pointBackgroundColor: "#646cffe5",
        //pointBorderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    pointStyle: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        font: { size: 14 },
        text: `From ${primaryCurrency} to ${secondaryCurrency}`,
      },
    },
    scales: {
      x: { title: { display: false, text: "Date" } },
      y: { title: { display: false, text: "Rate" } },
    },
  };

  useEffect(() => {
    const fetchRange = async () => {
      const data = await getCurrencyRange(
        primaryCurrency,
        secondaryCurrency,
        activeTab
      );
      setRangeData(data ?? []);
      console.log("function", data);
    };
    fetchRange();
  }, [primaryCurrency, secondaryCurrency, activeTab]);

  return { data, options };
};
