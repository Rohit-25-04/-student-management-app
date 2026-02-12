 import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Pie() {
  const [datacount, setdatacount] = useState({
    Student: 0,
    Teachers: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stats/type`)
      .then(res => res.json())
      .then(data => setdatacount(data))
      .catch(err => console.log(err));
  }, []);

  const data = {
    labels: ["Students", "Teachers"],
    datasets: [
      {
        data: [datacount.Student, datacount.Teachers],
        backgroundColor: ["#3b82f6", "#f43f5e"],
        borderRadius: 12,
        spacing: 4,
      },
    ],
  };

  const options = {
    cutout: "40%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-75 md:w-96">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Users Distribution
      </h2>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default Pie;
