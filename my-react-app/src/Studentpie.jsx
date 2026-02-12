// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJs,ArcElement,Tooltip,Legend } from "chart.js";
// ChartJs.register(ArcElement,Tooltip,Legend)
// function Studentspie(){
//     const[studentcount,setstudentcount]=useState({
//         Male:0,
//         Female:0
//     })
//     useEffect(async()=>{
//       await  fetch("http://localhost:5001/api/students/type")
//       .then(res=>res.json())
//       .then(data=>setstudentcount(data))
//       .catch(err=>console.log(err))
//     },[])
// const data={
//     label:["Male","Female"],
//     dataset:[{
//         data:[studentcount.Male,studentcount.Female],
//          backgroundColor: ["#3b82f6", "#ec4899"],
//     }]
// }
// }

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function StudentsBar() {
  const [count, setCount] = useState({
    Male: 0,
    Female: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/student/gender`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Bar data 👉", data);
        setCount(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Students",
        data: [count.male, count.female],
        backgroundColor: ["#3b82f6", "#ec4899"],
        borderRadius: 10, // 🔥 rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white  p-4 rounded-xl shadow-md w-77 md:w-96">
      <h2 className="text-lg font-semibold text-center mb-4">
        Students Gender (Bar Chart)
      </h2>

      <Bar data={data} options={options} />
    </div>
  );
}

export default StudentsBar;
