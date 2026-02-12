 import axios from "axios";
import React, { useEffect, useState } from "react";

function Notify() {

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const [notice, setNotice] = useState({
    Title: "",
    Description: "",
    Level: "",
  });

  const [specific, setSpecific] = useState({
    title: "",
    description: "",
    level: "",
  });

  /* ===== FETCH STUDENTS ===== */
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/student`)
      .then(res => setStudents(res.data))
      .catch(err => console.log(err));
  }, []);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecificChange = (e) => {
    const { name, value } = e.target;
    setSpecific(prev => ({ ...prev, [name]: value }));
  };

  /* ===== SUBMIT ===== */
  const submitNotice = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/notice`, notice);
    setNotice({ Title: "", Description: "", Level: "" });
    alert("Notice added");
  };

  const submitSpecificNotice = async () => {
    if (!selectedStudent) {
      alert("Select a student first");
      return;
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/api/specific`, {
      Studentid: selectedStudent,
      title: specific.title,
      description: specific.description,
    });

    setSpecific({ title: "", description: "", level: "" });
    setSelectedStudent("");
    alert("Email sent");
  };

  return (
    <div className="bg-gray-300 p-6 rounded space-y-10 text-black">

      {/* ===== GENERAL NOTICE ===== */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          📢 Create Notice
        </h2>

        <input
          type="text"
          name="Title"
          placeholder="Notice Title"
          value={notice.Title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-400 rounded text-black"
        />

        <textarea
          name="Description"
          placeholder="Notice Description"
          value={notice.Description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-400 rounded text-black"
        />

        <select
          name="Level"
          value={notice.Level}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-400 rounded text-black"
        >
          <option value="">Select Level</option>
          <option>Normal</option>
          <option>Important</option>
          <option>Urgent</option>
        </select>

        <button
          onClick={submitNotice}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Submit Notice
        </button>
      </div>

      {/* ===== SPECIFIC NOTICE ===== */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          🎯 Specific Student Notice
        </h2>

        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="w-full mb-3 p-2 border border-gray-400 rounded text-black"
        >
          <option value="">Select Student</option>
          {students.map(stu => (
            <option key={stu._id} value={stu._id}>
              {stu.Name} ({stu.Rollno})
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={specific.title}
          onChange={handleSpecificChange}
          className="w-full mb-3 p-2 border border-gray-400 rounded text-black"
        />

        <textarea
          name="description"
          placeholder="Notice Description"
          value={specific.description}
          onChange={handleSpecificChange}
          className="w-full mb-4 p-2 border border-gray-400 rounded text-black"
        />

        <button
          onClick={submitSpecificNotice}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Send Email
        </button>
      </div>

    </div>
  );
}

export default Notify;
