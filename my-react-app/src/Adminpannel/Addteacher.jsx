 import axios from "axios";
import React, { useState, useEffect } from "react";

function Addstaff() {
  const [courses, setCourses] = useState([]);

  const [data, setData] = useState({
    Username: "",
    Password: "",
    Name: "",
    Salary: "",
    Phone: "",
    Email: "",
    Course: "",
    Role: "",
    Gender: "",
  });

  // 🔥 Load courses for dropdown
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load courses");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/teacher`,
        data,
        { withCredentials: true }
      );

      alert("Staff Added Successfully ✅");

      setData({
        Username: "",
        Password: "",
        Name: "",
        Salary: "",
        Phone: "",
        Email: "",
        Course: "",
        Role: "",
        Gender: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error while adding staff ❌");
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-8">

        <h2 className="text-3xl font-semibold text-center text-black mb-8">
          Staff Adding Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ===== NORMAL INPUTS ===== */}
          {[
            { label: "Username", name: "Username", type: "text" },
            { label: "Password", name: "Password", type: "password" },
            { label: "Name", name: "Name", type: "text" },
            { label: "Salary", name: "Salary", type: "number" },
            { label: "Phone", name: "Phone", type: "text" },
            { label: "Email", name: "Email", type: "email" },
            { label: "Role", name: "Role", type: "text" },
            { label: "Gender", name: "Gender", type: "text" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm text-black font-medium">
                {item.label}
              </label>

              <input
                type={item.type}
                name={item.name}
                value={data[item.name]}
                onChange={handleChange}
                className="h-10 px-3 text-black border rounded-md"
              />
            </div>
          ))}

          {/* ===== COURSE SELECT ===== */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-black font-medium">
              Course
            </label>

            <select
              name="Course"
              value={data.Course}
              onChange={handleChange}
              className="h-10 px-3 border text-black rounded-md"
            >
              <option value="">Select Course</option>

              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Coursename}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* ===== BUTTON ===== */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={submit}
            className="px-10 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

export default Addstaff;
