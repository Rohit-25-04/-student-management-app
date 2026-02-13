//   import React, { useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
//  import Subject from "./Subjects";
//   import Classes from "./Classes"
 

// function Admin() {
//   const [isopen, setisopen] = useState(false);
//   const [active,setactive]=useState("student")

//   return ( <>
//  {/* outerdiv*/}
//   <div className="flex">
//     {/* slidebar*/ }
// <div className={`fixed top-0 left-0 h-full w-60 ${
//     isopen?"translate-x-0":"-translate-x-full"
// } transition-transform duration-300`}>
// <div className="bg-gray-400 w-full">
//     <h3>Admin Panel</h3>
//     <ul className="flex flex-col">
//         <li className="cursor-pointer">home</li>
//         <li onClick={()=>setactive("student")}>course</li>
//         <li onClick={()=>setactive("subject")}>subjects</li>
//         <li>Add Subject</li>
//         <li> Add Student</li>
//         <li>view Attendace</li>
//         <li>student feedback</li>
//         <li>teacher feedback</li>
//         <li>logout</li>
//     </ul>
// </div>
// {isopen&&(<div className="inset-0 fixed bg-black opacity-40" onClick={()=>setisopen(false)}></div>)}
  
// </div>
// <div className="w-full"> 
//  {/* navbar */}
//  <div className="bg-blue-400 h-15 w-full flex p-3 place-content-between">
// <button onClick={()=>setisopen(!isopen)}>
//     {isopen?<Bars3Icon/>:<XMarkIcon/>}
// </button>
// <h1>admin dashord</h1>

//  </div>
//  <div className="pl-60">
     
//     <div className="pl-60 p-4">
 
//   {active === "student" && <Classes />}
//   {active === "subject" && <Subject />}
// </div>

//  </div>
//  </div>
//   </div>
  
//   </>
//   );
// }

// export default Admin;

import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Subject from "./Subjects";
import Login from "./Login";
import Classes from "./Classes";
 import Managestudent from "./Adminpannel/Managestudent";
import Addstudent from "./Add-student";
import StudentFeedback from "./Adminpannel/Studentfeedback";
import StaffFeedback from "./Adminpannel/Stafffeedback";
import Addstaff from "./Adminpannel/Addteacher";
import Managestaff from "./Adminpannel/Managestaff"
import Pie from "./Piechart";
import Studentpie from "./Studentpie"
import Subjects from "./Adminpannel/Subjects";
import Exams from "./Adminpannel/Exam";
import Notice from "./Adminpannel/Notice";
import Notify from "./Adminpannel/Notify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [totalcourse,settotalcourse]=useState([])
  const [total,settotal]=useState([])
  const[subjectcount,setsubjectcount]=useState([])
  const [isopen, setisopen] = useState(false);
  const [active, setactive] = useState("home");
  const navigate=useNavigate()
  useEffect(() => {
    fetchstudent();
    fetchcourse();
    fetchsubject()
     axios.get(`${import.meta.env.VITE_API_URL}/api/authcheck` ,{ withCredentials: true })
    .catch(() => {
      navigate("/login");
    });
}, []);  
const fetchsubject=async()=>{
  const res=await fetch(`${import.meta.env.VITE_API_URL}/api/subject/stats`,{credentials:"include"})
  const data=await res.json();
  console.log(data)
  setsubjectcount(data);
}
const fetchstudent=async()=>{
  const res= await fetch(`${import.meta.env.VITE_API_URL}/api/stats/type`, {credentials: "include"})
  const data= await res.json()
  settotal(data)
  console.log(total)
}
const fetchcourse=async()=>{
  const res= await fetch(`${import.meta.env.VITE_API_URL}/api/course/stats` ,{credentials:"include"})
  const sdata= await res.json()
  settotalcourse(sdata)
  console.log(totalcourse)
}


const handlelogout=async()=>{
axios.post(`${import.meta.env.VITE_API_URL}/api/logout`,{},
   {withCredentials:true}
    
)
 
 navigate("/login")
}
  return (
    <div className="flex h-full ">

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full md:w-60 w-20 bg-gray-400 transform ${
          isopen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <h3 className="p-4 font-bold">Admin Panel</h3>
        <ul className="flex flex-col gap-2 p-4">
          <li onClick={() => setactive("home")} className=" grid place-content-center cursor-pointer border border-black rounded h-10">Home</li>
          <li onClick={() => setactive("classes")} className="cursor-pointer border  grid place-content-center border-black rounded h-10">Classes</li>
           
          <li onClick={() => setactive("subjects")} className="cursor-pointer border  grid place-content-center border-black rounded h-10">Subjects</li>
           <li onClick={() => setactive("addstudent")} className="cursor-pointer border  grid place-content-center border-black rounded h-10">Add-student</li>
            <li onClick={() => setactive("managestudent")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Manage-student</li>
            <li onClick={() => setactive("addstaff")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Add-Staff</li>
            <li onClick={() => setactive("managestaff")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Manage-Staff</li>
            <li onClick={() => setactive("exam")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Exam</li>
            <li onClick={() => setactive("studentfeedback")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Student-feedback</li>
            <li onClick={() => setactive("stafffeedback")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Staff-feedback</li>
            <li onClick={() => setactive("notice")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Notify-Student</li>
            <li onClick={() => setactive("notify")} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Notify</li>
            <li onClick={handlelogout} className="cursor-pointer  grid place-content-center border border-black rounded h-10">Logout</li>
        </ul>
      </div>

      {/* OVERLAY */}
      {isopen && (
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={() => setisopen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <div className="w-full h-full  overflow-scroll">

        {/* NAVBAR */}
        <div className="bg-blue-400 h-20 p-4 flex gap-19    md:justify-between ">
          <button onClick={() => setisopen(!isopen)}>
            {isopen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
          <h2 className="font-semibold text-3xl ">Admin Dashboard</h2>
        </div>

        {/* PAGE CONTENT */}
        <div className="md:pl-60 pl-20  p-6 h-screen ">
    {active === "home" && (
  <div className="flex flex-col gap-10">

    {/* ===== STATS CARDS ===== */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-cyan-500 rounded-2xl shadow-lg p-5 text-white">
        <h2 className="text-4xl font-bold">{total.Student}</h2>
        <p className="text-lg mt-2">Total Students</p>
      </div>

      <div className="bg-green-500 rounded-2xl shadow-lg p-5 text-white">
        <h2 className="text-4xl font-bold">{total.Teachers}</h2>
        <p className="text-lg mt-2">Total Staff</p>
      </div>

      <div className="bg-orange-500 rounded-2xl shadow-lg p-5 text-white">
        <h2 className="text-4xl font-bold">{subjectcount}</h2>
        <p className="text-lg mt-2">Total Subjects</p>
      </div>

      <div className="bg-red-500 rounded-2xl shadow-lg p-5 text-white">
        <h2 className="text-4xl font-bold">{totalcourse}</h2>
        <p className="text-lg mt-2">Total Courses</p>
      </div>
    </div>

    {/* ===== CHART SECTION ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          📊 Students Overview
        </h3>
        <Pie />
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          👥 Gender Distribution
        </h3>
        <Studentpie />
      </div>
    </div>

    {/* ===== NOTICE BOARD ===== */}
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <Notice />
    </div>

  </div>
)}

            
          {active === "classes" && <Classes />}
          
          {active === "subjects" && <Subjects />}
          {active === "addstudent" && <Addstudent />} 
          {active === "managestudent" && <Managestudent />} 
          {active === "addstaff"&& <Addstaff/>}
          {active==="managestaff"&&<Managestaff/>}
           {active === "studentfeedback" && <StudentFeedback />} 
            {active === "stafffeedback" && <StaffFeedback/>} 
            {active === "exam" && <Exams/>}
            {active==="notice"&& <Notice/>}
              {active==="notify"&& <Notify/>}
               
        </div>

      </div>
    </div>
  );
}

export default Admin;
