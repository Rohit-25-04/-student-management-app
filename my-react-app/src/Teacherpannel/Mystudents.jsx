 import React, { useEffect, useState } from "react";
import axios from "axios";

function Mystudent() {
  const [sdata, setsdata] = useState([]);

  useEffect(() => {
    fetchmystudent();
  }, []);

  const fetchmystudent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/mystudent`, {
        withCredentials: true,
      });
      setsdata(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">My Students</h2>

      {/* Responsive wrapper */}
      <div className="overflow-scroll w-70 sm:w-80 md:w-full md:overflow-x-visible">
        <table className="w-full md:min-w-[600px] border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border border-gray-300">Student Name</th>
              <th className="p-2 border border-gray-300">Roll No</th>
              <th className="p-2 border border-gray-300">Semester</th>
              <th className="p-2 border border-gray-300">Course</th>
            </tr>
          </thead>

          <tbody>
            {sdata.map((s) => (
              <tr key={s._id} className="border-b border-gray-300 text-black">
                <td className="p-2">{s.Name}</td>
                <td className="p-2">{s.Rollno}</td>
                <td className="p-2 text-center">{s.Semester}</td>
                <td className="p-2">{s.Course?.Coursename}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Mystudent;
