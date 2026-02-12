 // TeacherDashboard.jsx
import React, { useState,useEffect} from "react";
import Pie from "/src/Piechart";
import {
  Bars3Icon,
  XMarkIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
 import Attendance from "./Attandance";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
import Marks from "./Marks"
import Mystudent   from "./Mystudents";
import Notice from "../Adminpannel/Notice";
 
function TeacherDashboard() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState("dashboard");
 const navigate=useNavigate()
  useEffect(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/authcheck`, {
      withCredentials: true,
    })
    .catch(() => {
      navigate("/login");
    });
}, []);
  const handlelogout=async()=>{
    axios.post(`${import.meta.env.VITE_API_URL}/api/logout`,
      {},
      {withCredentials:true}
    )
    
 navigate("/login")
  }

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ===== SIDEBAR ===== */}
      <div
        className={`fixed top-0 left-0 h-full w-32 md:w-64 bg-white shadow-xl transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 z-50`}
      >
        <h2 className="text-2xl font-bold p-6 border-b text-purple-600">Teacher Panel</h2>

        <ul className="p-4 space-y-4 text-gray-700">
          <li
            className="flex items-center gap-3 hover:text-purple-600 cursor-pointer"
            onClick={() => setPage("dashboard")}
          >
            <AcademicCapIcon className="h-5" /> Dashboard
          </li>
          <li
            className="flex items-center gap-3 hover:text-purple-600 cursor-pointer"
            onClick={() => setPage("attendance")}
          >
            <ClipboardDocumentCheckIcon className="h-5" /> Attendance
          </li>
          <li
            className="flex items-center gap-3 hover:text-purple-600 cursor-pointer"
            onClick={() => setPage("marks")}
          >
            <ChartBarIcon className="h-5" /> Marks Entry
          </li>
          <li
            className="flex items-center gap-3 hover:text-purple-600 cursor-pointer"
            onClick={()=>setPage("mystudent")}
          >
            <UserGroupIcon className="h-5" /> My Students
          </li>
          <li className="flex items-center gap-3 text-red-500 mt-8 cursor-pointer" onClick={handlelogout}>
            <ArrowRightOnRectangleIcon className="h-5" /> Logout
          </li>
        </ul>
      </div>
  {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* ===== MAIN ===== */}
      <div className={`flex-1   transition-all`}>

        {/* ===== NAVBAR ===== */}
        <div className="h-16 bg-white shadow flex items-center justify-between px-6">
          <button onClick={() => setOpen(!open)}>
            {open ? <XMarkIcon className="h-7" /> : <Bars3Icon className="h-7" />}
          </button> 

          <div className="h-10 w-10 rounded-full bg-purple-500 text-white grid place-content-center font-bold">
            T
          </div>
        </div>

        {/* ===== PAGE CONTENT ===== */}
        <div className="p-6 space-y-8">
          {page === "dashboard" && (
            <>
              {/* ===== STATS ===== */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card title="Total Classes" value="6" color="bg-purple-500" />
                <Card title="Students" value="120" color="bg-blue-500" />
                <Card title="Subjects" value="3" color="bg-green-500" />
                <Card title="Today's Attendance" value="85%" color="bg-orange-500" />
              </div>

              {/* ===== QUICK ACTIONS ===== */}
             <div className="grid grid-cols-1   md:grid-cols-2 gap-6">
                 <Pie/>
                <Notice/>
              </div> 

              {/* ===== RECENT ACTIVITY ===== */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">📌 Recent Activity</h2>
                <ul className="space-y-3 text-gray-600">
                  <li>✔ Attendance marked for BCA Sem 3</li>
                  <li>✔ Internal marks uploaded</li>
                  <li>✔ Exam results updated</li>
                </ul>
              </div>
            </>
          )}

          {page === "attendance" && <Attendance />}
          {page === "marks" && <Marks />}
          {page==="mystudent"&&<Mystudent/>}
        </div>
      </div>
    </div>
  );
}

// ===== Helper Components =====
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white rounded-xl p-5 shadow-lg`}>
    <h2 className="text-3xl font-bold">{value}</h2>
    <p className="mt-2">{title}</p>
  </div>
);

const Action = ({ title, desc }) => (
  <div className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition cursor-pointer">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-500 mt-2">{desc}</p>
  </div>
);

export default TeacherDashboard;

