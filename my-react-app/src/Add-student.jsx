 import React, { useState, useEffect } from "react";
import axios from "axios";

function Addstudent() {
  const [data, setData] = useState({
    Username: "",
    Password: "",
    Email:"",
    Name: "",
    Rollno: "",
    Course: "", 
    Semester:"",// ObjectId of selected course
    Paidfee: "",
    Totalfee: "",
    Gender: "",
    Role: "",
  });

  const [courses, setCourses] = useState([]); // For dropdown

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };
    fetchCourses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle course selection change
  const handleCourseChange = (e) => {
    setData((prev) => ({ ...prev, Course: e.target.value }));
  };

  // Submit form
  const submit = async () => {
    if (!data.Course) return alert("Please select a course");

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/student`, data);
      alert("Student Added Successfully ✅");
      setData({
        Username: "",
        Password: "",
        Email:"",
        Name: "",
        Rollno: "",
        Course: "",
        Semester:"",
        Paidfee: "",
        Totalfee: "",
        Gender: "",
        Role: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-pink-200 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] p-6 md:p-10">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Add Student
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { label: "Username", name: "Username", type: "text" },
            { label: "Password", name: "Password", type: "password" },
             { label: "Email", name: "Email", type: "Email" },
            { label: "Name", name: "Name", type: "text" },
            { label: "Roll No", name: "Rollno", type: "text" },
              { label: "Semester", name: "Semester", type: "text" },
            { label: "Paid Fee", name: "Paidfee", type: "number" },
            { label: "Total Fee", name: "Totalfee", type: "number" },
            { label: "Gender", name: "Gender", type: "text" },
            { label: "Role", name: "Role", type: "text" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                {item.label}
              </label>
              <input
                type={item.type}
                name={item.name}
                value={data[item.name]}
                onChange={handleChange}
                placeholder={`Enter ${item.label}`}
                className="h-10 px-3 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          ))}

          {/* Course dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Course</label>
            <select
              value={data.Course}
              onChange={handleCourseChange}
              className="h-10 px-3 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Coursename}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={submit}
            className="px-12 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addstudent;
