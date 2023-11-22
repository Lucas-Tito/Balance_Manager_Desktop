import React, { useContext, useEffect, useState } from "react";
import { Chart, RadialLinearScale, ArcElement, Title, Tooltip } from "chart.js";
import { PolarArea } from "react-chartjs-2";
import { TransactionsContext } from "../../TransactionContext";
import { useLocation } from "react-router-dom";
import { SimpleHeader } from "../Header";
Chart.register(RadialLinearScale, ArcElement, Title, Tooltip);

const Charts = () => {
  const [transactions, setTransactions] = useState();
  const location = useLocation();
  let userid = "";

  if (location.state) {
    userid = location.state.userid;
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/transactions/user/${userid}`)
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, [transactions]);

  let data = {
    labels: transactions?.map((data) => data.category),
    datasets: [
      {
        label: "#",
        data: transactions?.map((data) => data.value),
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
        suggestedMin: 1,
        suggestedMax: 10,
        grid: {
          display: true,
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
          stepSize: 100,
          font: {
            size: 20,
          },
          color: "#FFFF",
        },
      },
    },
  };

  return (
    <>
      <SimpleHeader />
      <div style={{ width: 750, height: 750 }}>
        <PolarArea data={data} options={options} />
      </div>
    </>
  );
};

export default Charts;
