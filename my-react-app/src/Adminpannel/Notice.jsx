 import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

function Notice() {
  const [noticedata, setNoticedata] = useState([]);

  useEffect(() => {
    fetchnotice();
  }, []);

  // ================= FETCH =================
  const fetchnotice = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notice`, {
        credentials: "include",
      });
      const data = await response.json();
      setNoticedata(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const deleteNotice = async (id) => {
    const ok = window.confirm("Delete this notice?");
    if (!ok) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/notice/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      // refresh list
      fetchnotice();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-700 mb-8 text-center">
          📢 Notice Board
        </h2>

        {noticedata.length === 0 ? (
          <p className="text-center text-gray-500">
            No notices available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {noticedata.map((n) => (
              <div
                key={n._id}
                className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-purple-600 hover:shadow-2xl transition flex flex-col justify-between"
              >
                {/* TOP */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {n.Title}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        n.Level === "Urgent"
                          ? "bg-red-100 text-red-600"
                          : n.Level === "Important"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {n.Level}
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {n.Description}
                  </p>
                </div>

                {/* BOTTOM BAR */}
                <div className="flex justify-between items-center mt-6">

                  {/* DATE */}
                  <p className="text-xs text-gray-400">
                    📅 {new Date(n.createdAt).toLocaleString()}
                  </p>

                  {/* DELETE ICON */}
                  <button
                    onClick={() => deleteNotice(n._id)}
                    className="p-2 rounded-full hover:bg-red-100 transition shadow-sm hover:shadow-md group"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500 group-hover:text-red-700" />
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default Notice;
