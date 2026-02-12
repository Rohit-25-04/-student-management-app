import React, { useEffect, useState } from "react";

function StaffFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ staffName: "", message: "" });

  // Fetch existing feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`); // backend API
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Add new feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.staffName || !newFeedback.message) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });
      const data = await res.json();
      setFeedbacks([...feedbacks, data]);
      setNewFeedback({ staffName: "", message: "" });
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <div className="max-w-5xl mx-auto">
        {/* Form */}
        <div className=" bg-blue-300 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4">Add Staff Feedback</h2>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Staff Name"
              value={newFeedback.staffName}
              onChange={(e) => setNewFeedback({ ...newFeedback, staffName: e.target.value })}
              className="border-2 border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Feedback Message"
              value={newFeedback.message}
              onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
              className="border-2 border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition col-span-full sm:col-span-1"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Staff Name</th>
                <th className="px-4 py-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {feedbacks.map((f) => (
                <tr key={f._id} className="bg-amber-100 hover:bg-amber-200 transition">
                  <td className="px-4 py-2">{f.staffName}</td>
                  <td className="px-4 py-2">{f.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StaffFeedback;
