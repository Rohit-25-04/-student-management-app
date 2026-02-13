 import React, { useEffect, useState } from "react";

function PersonalDetails() {
  const [pdata, setpdata] = useState(null);

  useEffect(() => {
    fetchdetails();
  }, []);

  const fetchdetails = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    setpdata(data);
  };

  if (!pdata) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-300 p-6">
      <h1 className="text-2xl font-bold mb-6">Personal Details</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold">
          {pdata.Name?.charAt(0)}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black ">{pdata.Name}</h2>
          <p className="text-gray-500">Student</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Detail label="Username" value={pdata.Username} />
        <Detail label="Email" value={pdata.Email} />
        <Detail label="Roll No" value={pdata.Rollno} />
        <Detail label="Gender" value={pdata.Gender} />
        <Detail label="Course" value={pdata.Course?.Coursename} />
        <Detail label="Paid Fees" value={pdata.Paidfee} />
        <Detail label="Total Fees" value={pdata.Totalfee} />
      </div>
    </div>
  );
}

const Detail = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default PersonalDetails;
