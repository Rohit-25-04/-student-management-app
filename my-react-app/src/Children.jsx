 // StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import Notice from "./Adminpannel/Notice";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Studentpie from "./Studentpie";
import PersonalDetails from "./StudentPannel/Personal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentMarksPanel from "./StudentPannel/Result";


function StudentDashboard() {
  const [isopen, setisopen] = useState(false);
  const [page, setpage] = useState("home");
  const [sdata, setsdata] = useState(null);
  const [subject, setsubjects] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const Navigate=useNavigate()

  useEffect(() => {
    studentdata();
    subjectdata();
    fetchActiveSession();
  }, []);

   useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/authcheck`, {
        withCredentials: true,
      })
      .catch(() => {
        Navigate("/login");
      });
  }, []);
 const handlelogout=async()=>{
 axios.post(`${import.meta.env.VITE_API_URL}/api/logout`,{},
    {withCredentials:true}
     
 )
  
  Navigate("/login")
 }
  // ================= STUDENT =================
  const studentdata = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
        credentials: "include",
      });
      const data = await res.json();
      setsdata(data);
      console.log(sdata)
    } catch (error) {
      console.log("Error fetching student data", error);
    }
  };

  // ================= SUBJECT =================
  const subjectdata = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject`);
      const data = await res.json();
      setsubjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= ATTENDANCE SESSION =================
 const fetchActiveSession = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/attendance/active`,
      { withCredentials: true }
    );

    console.log("ATTENDANCE SESSION 👉", res.data);

    setActiveSession(res.data);

  } catch (err) {
    console.log("Failed to fetch active session:", err);
    setActiveSession(null);
  }
};


  // ================= MARK ATTENDANCE =================
   const markAttendance = async () => {
  if (!activeSession) {
    alert("No active attendance session");
    return;
  }

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/attendance/mark`,
      {
        sessionId: activeSession._id,
        studentId: sdata._id,
        status: "present"   // ✅ ADD THIS
      },
      { withCredentials: true }
    );

    alert("Attendance marked successfully ✅");
    setActiveSession(null);

  } catch (err) {
    console.error("MARK ERROR 👉", err.response?.data || err.message);
    alert("Attendance already marked or error");
  }
};
const pendingFee = sdata
  ? Math.max(0, Number(sdata.Totalfee) - Number(sdata.Paidfee))
  : 0;
 

  return (
    <div className="flex h-full bg-white">
      {/* SIDEBAR */}
      <div
        className={`fixed left-0 top-0 h-full w-32 md:w-60 bg-gray-600 text-white transform transition-transform duration-300 z-50
        ${isopen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="p-4 font-bold border-b border-gray-500">
          Student Panel
        </h2>
        <ul className="p-4 space-y-3">
          <li onClick={() => setpage("home")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Home</li>
          <li onClick={() => setpage("notice")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Notice</li>
          <li onClick={() => setpage("mark")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Marks</li>
          <li onClick={() => setpage("details")} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Personal Details</li>
          <li onClick={handlelogout} className="cursor-pointer hover:bg-gray-700 p-2 rounded">Logout</li>
        </ul>
      </div>

      {isopen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40"
          onClick={() => setisopen(false)}
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* NAVBAR */}
        <div className="bg-blue-500 h-16 flex items-center justify-between px-4 text-white">
          <Bars3Icon
            className="h-8 w-8 cursor-pointer"
            onClick={() => setisopen(true)}
          />
          <span className="font-semibold">{sdata?.Name || "Student"}</span>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 md:p-6 ml-0 md:ml-60 overflow-y-auto">
          {page === "home" && (
            <>
              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Stat title="Total Subjects" value={subject.length} color="bg-pink-500" />
                <Stat title="Pending Fees" value={`₹${pendingFee}`} color="bg-green-500" />
                <Stat title="Semester" value={sdata?.Semester||"-"} color="bg-orange-500" />
              <Stat title="Totalfee" value= {sdata ? `₹${sdata.Totalfee}` : "₹0"} color="bg-blue-500" />
              </div>

              {/* ✅ ATTENDANCE BOX */}
              {activeSession && (
                <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                  <p className="font-semibold text-yellow-800">
                    📋 Attendance OPEN – {activeSession.subjectId?.Subjectname}
                  </p>
                  <button
                    onClick={markAttendance}
                    className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Mark My Attendance
                  </button>
                </div>
              )}

              {/* CHART + NOTICE */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                  <Studentpie />
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <Notice />
                </div>
              </div>
            </>
          )}

          {page === "notice" && <Notice />}
          {page === "details" && <PersonalDetails />}
          {page==="mark"&&<StudentMarksPanel/>}
        </div>
      </div>
    </div>
  );
}

const Stat = ({ title, value, color }) => (
  <div className={`${color} text-white p-4 rounded shadow`}>
    <p className="text-sm">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default StudentDashboard;
