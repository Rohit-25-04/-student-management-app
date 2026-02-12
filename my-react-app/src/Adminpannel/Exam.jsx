 import React, { useEffect, useState } from "react";

function Exam() {
  const [courses, setCourses] = useState([]);
  const [exams, setExams] = useState([]);

  const [exam, setExam] = useState({
    Examname: "",
    Date: "",
    Subject: "",
    Course: "",
    Semester: "",
    TotalMarks: "",
  });

  useEffect(() => {
    fetchCourses();
    fetchExams();
  }, []);

  const fetchCourses = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course`);
    const data = await res.json();
    setCourses(data);
  };

  const fetchExams = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exam`);
    const data = await res.json();
    console.log(data)
    setExams(data);
  };

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/exam`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exam),
    });

    fetchExams();
  };

  // 🔥 FORCE TEXT COLOR (THIS IS THE FIX)
  const inputClass =
    "w-full bg-white text-black placeholder-gray-500 border border-gray-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10 text-black">
      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-black">
          📘 Exam Management
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <input
            className={inputClass}
            type="text"
            name="Examname"
            placeholder="Exam Name"
            value={exam.Examname}
            onChange={handleChange}
          />

          <input
            className={inputClass}
            type="date"
            name="Date"
            value={exam.Date}
            onChange={handleChange}
          />

          <input
            className={inputClass}
            type="text"
            name="Subject"
            placeholder="Subject"
            value={exam.Subject}
            onChange={handleChange}
          />

          <select
            className={inputClass}
            name="Course"
            value={exam.Course}
            onChange={handleChange}
          >
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id} className="text-black">
                {c.Coursename}
              </option>
            ))}
          </select>

          <input
            className={inputClass}
            type="text"
            name="Semester"
            placeholder="Semester"
            value={exam.Semester}
            onChange={handleChange}
          />

          <input
            className={inputClass}
            type="number"
            name="TotalMarks"
            placeholder="Total Marks"
            value={exam.TotalMarks}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
          >
            ➕ Add Exam
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-black">
          📋 Exam List
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((e) => (
            <div
              key={e._id}
              className="bg-green-600 text-white p-4 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold">{e.Examname}</h3>
              <p>Date: {e.Date}</p>
              <p>Subject: {e.Subject}</p>
              <p>Semester: {e.Semester}</p>
              <p>Marks: {e.TotalMarks}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Exam;
