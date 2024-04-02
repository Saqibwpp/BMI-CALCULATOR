import { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // ADD THIS

export const Chartcomponent = () => {
  const ref = useRef();
  const data = {
    labels: ["underweight", "normal", "overweight", "obese"],
    datasets: [
      {
        data: [18.5, 24.9, 29.9, 50],
        backgroundColor: ["#3B82F6", "#E11D48", "#FDE047", "#059669"],
        radius: "80%",
        cutout: 110,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
    },
  };

  return (
    <div>
      <Doughnut ref={ref} data={data} options={options} />
    </div>
  );
};
