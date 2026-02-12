 import React, { useEffect, useState } from "react";
import Axios from "axios";

function Course() {
  const [coursedata, setcoursedata] = useState({
    Coursename: "",
    Duration: "",
    Totalsubject: ""
  });
  const[countcourse,setcountcourse]=useState([])
  const [course,setcourse]=useState([])

useEffect(()=>{
  fetchcountcourse()
  fetchcourse()
},[])
const fetchcountcourse=async()=>{
  const res=await fetch(`${import.meta.env.VITE_API_URL}/api/course/stats`)
  const data= await res.json()
  setcountcourse(data)
}

const fetchcourse=async()=>{
  const res=await fetch(`${import.meta.env.VITE_API_URL}/api/Courses`)
  const coursedata=await res.json()
  setcourse(coursedata);
}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcoursedata((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = () => {
    Axios.post(`${import.meta.env.VITE_API_URL}/api/courses`, coursedata);
    setcoursedata({ Coursename: "", Duration: "", Totalsubject: "" });
  };

  return (
    <>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1   gap-4">
          <div className="bg-blue-500 p-4 rounded-lg">
            <h3>Total Course</h3>
            <h3>{countcourse}</h3>
          </div>

         
        </div>

        {/* Input box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-500 p-4 rounded-xl">
            <h2 className="text-white md:mb-15 text-2xl font-bold mb-2">
              Add New Course
            </h2>

            <input
              type="text"
              name="Coursename"
              value={coursedata.Coursename}
              placeholder="Enter course name"
              onChange={handleChange}
              className="h-10 md:h-13 w-full mb-2 md:mb-5"
            /> 

            <input
              type="text"
              name="Duration"
              value={coursedata.Duration}
              onChange={handleChange}
              className="h-10 md:h-13 w-full mb-2 md:mb-5"
              placeholder="Duration"
            />

            <input
              type="text"
              name="Totalsubject"
              value={coursedata.Totalsubject}
              onChange={handleChange}
              className="h-10  md:h-13 w-full mb-2 md:mb-5"
              placeholder="Total Subjects"
            />

            <button
              onClick={submit}
              className="w-full h-8 bg-blue-600 text-white rounded md:h-10 mt-3"
            >
              Add Course
            </button>
          </div>

          <div className="bg-gray-500 overflow-y-auto rounded-xl p-2">
            <h2 className="text-white text-center text-3xl font-semibold">Course list</h2>
            <table className="w-full text-sm text-white ">
              <thead>
                <tr>
                  <th className="p-3">Course</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Subjects</th>
                </tr>
              </thead>
              <tbody >
                {course.map((c)=>(
                  <tr key={c._id} className="text-center ">
                    <td className="p-3">{c.Coursename}</td>
                    <td className="p-3">{c.Duration}</td>
                     <td className="p-3">{c.Totalsubject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;



















//  