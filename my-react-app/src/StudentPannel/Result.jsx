import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentMarksPanel() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/student/marks`,
        { withCredentials: true }
      );
      console.log(res.data)
      setMarks(res.data);
    } catch (err) {
      console.error("Marks fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="p-4 h-screen  md:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4">My Exam Marks</h2>

      <div className="bg-white  shadow rounded-2xl  ">
        {/* mobile scroll wrapper */}
        <div className="overflow-x-auto   ">
          <table className="min-w-[10px] w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left text-black p-3">Subject</th>
                <th className="text-left text-black p-3">Exam</th>
                <th className="text-left text-black p-3">Marks</th>
              </tr>
            </thead>

            <tbody>
              {marks.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-black  ">
                    No marks available
                  </td>
                </tr>
              )}

              {marks.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3 text-black font-medium">
                    {m.subject?.Subjectname || "—"}
                  </td>
                  <td className="p-3 text-black">{m.exam}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-700 font-semibold">
                      {m.marks}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
