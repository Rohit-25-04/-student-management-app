 import axios from "axios";
import React, { useEffect, useState } from "react";

function TeacherMarks() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});

  useEffect(() => {
    fetchSubjects();
  }, []);

  // 🔹 Fetch subjects
  const fetchSubjects = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject`);
    const data = await res.json();
    setSubjects(data);
  };

  // 🔹 Load students
  const loadStudents = async () => {
    if (!selectedSubject) {
      alert("Please select subject");
      return;
    }

    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/mark`, {
      subjectid: selectedSubject,
    });

    setStudents(res.data);
  };

  // 🔹 Handle marks input
  const handleMarksChange = (studentId, value) => {
    setMarks({
      ...marks,
      [studentId]: value,
    });
  };

  // 🔹 Save marks
  const saveMarks = async () => {
    if (!selectedExam) {
      alert("Please select exam");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/marks`, {
        subject: selectedSubject,
        exam: selectedExam,
        marks: marks,
      });

      console.log(res.data);
      alert("Marks saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving marks ❌");
    }
  };

  return (
    <div className="min-h-screen w-full  bg-gray-100 p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Teacher Marks Panel</h1>
        <p className="text-gray-500">Select subject → load students → enter marks</p>
      </div>

      {/* FILTER SECTION */}
      <div className="bg-white rounded-xl  shadow p-5 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SUBJECT */}
        <select
          className="border text-black md:w-40 lg:w-55 xl:w-74 w-60 rounded-lg p-2"
          value={selectedSubject}
          onChange={(e) => {
            const subId = e.target.value;
            setSelectedSubject(subId);

            const found = subjects.find((s) => s._id === subId);
            if (found) {
              setSemester(found.Semester);
            }
          }}
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>
              {s.Subjectname}
            </option>
          ))}
        </select>

        {/* SEMESTER */}
        <input
          className="border text-black md:w-40 lg:w-55 xl:w-74 w-60 rounded-lg p-2 bg-gray-100"
          value={semester}
          placeholder="Semester"
          readOnly
        />

        {/* EXAM */}
        <select
          className="border text-black md:w-40 lg:w-55 xl:w-74 w-60 rounded-lg p-2"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
        >
          <option value="">Select Exam</option>
          <option value="Internal">Internal Test</option>
          <option value="Mid">Mid Term</option>
          <option value="Final">Final Exam</option>
        </select>

        {/* LOAD BUTTON */}
        <button
          onClick={loadStudents}
          className="bg-blue-600 text-white md:w-40 lg:w-55 xl:w-74 w-60 rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Load Students
        </button>
      </div>

      {/* STUDENTS TABLE */}
      <div className="bg-white w-70 md:w-full rounded-xl shadow overflow-scroll">
        <table className="md:w-full   mr-5 text-black text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Roll No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Marks</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No students loaded
                </td>
              </tr>
            ) : (
              students.map((stu) => (
                <tr key={stu._id} className="border-b">
                  <td className="p-3">{stu.Rollno}</td>
                  <td className="p-3">{stu.Name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="border rounded-lg p-2 w-24"
                      value={marks[stu._id] || ""}
                      onChange={(e) =>
                        handleMarksChange(stu._id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* SAVE BUTTON */}
      {students.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={saveMarks}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            💾 Save Marks
          </button>
        </div>
      )}
    </div>
  );
}

export default TeacherMarks;
