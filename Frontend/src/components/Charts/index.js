import React from "react";
import { Chart, RadialLinearScale, ArcElement, Title, Tooltip } from "chart.js";
import { PolarArea } from "react-chartjs-2";
Chart.register(RadialLinearScale, ArcElement, Title, Tooltip);

const Charts = () => {
  let data = {
    labels: ["Mercado", "Casa", "Aluguel", "Teste", "Amongus", "Jogos"],
    datasets: [
      {
        label: "#",
        data: [1, 7, 8, 4, 5, 10],
        backgroundColor: [
          "rgba(68, 138, 255, 0.85)",
          "rgba(21, 101, 192, 0.85)",
          "rgba(0, 150, 136, 0.85)",
          "rgba(92, 154, 50, 0.85)",
          "rgba(255, 193, 7, 0.85)",
          "rgba(255, 152, 0, 0.85)",
          "rgba(244, 67, 54, 0.85)",
          "rgba(173, 20, 87, 0.85)",
          "rgba(161, 17, 172, 0.85)",
        ],
        borderWidth: 0,
      },
    ],
  };
  let options = {
    responsive: true,
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        grid: {
          circular: true,
          color: "#FFFF",
        },
        angleLines: {
          display: true,
          color: "#FFFF",
          lineWidth: 1,
        },
        pointLabels: {
          display: true,
          font: {
            size: 20,
          },
          padding: 0,
          centerPointLabels: true,
        },
        ticks: {
          stepSize: 2,
          font: {
            size: 19,
          },
          color: "#FFFF",
        },
      },
    },
  };

  return (
    <div style={{ width: 750, height: 750 }}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default Charts;
