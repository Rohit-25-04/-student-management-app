 import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function Subjects() {
  const [course, setCourse] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [Semester, setSemester] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [editSubject, setEditSubject] = useState(null);

  // ===== Fetch courses & subjects =====
  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/course`);
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/subject`);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== Add / Update =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !Semester || !selectedCourseId) {
      alert("Fill all fields");
      return;
    }

    try {
      const payload = {
        Subjectname: subjectName,
        Semester,
        Courseid: selectedCourseId,
      };

      if (editSubject) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/subject/${editSubject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setEditSubject(null);
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/api/subject`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setSubjectName("");
      setSemester("");
      setSelectedCourseId("");

      fetchSubjects();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  // ===== Edit =====
  const handleEdit = (s) => {
    setEditSubject(s);
    setSubjectName(s.Subjectname);
    setSemester(s.Semester);
    setSelectedCourseId(s.Courseid?._id); // ✅ fix
  };

  // ===== Delete =====
  const handleDelete = async (id) => {
    if (!window.confirm("Delete subject?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/subject/${id}`, {
        method: "DELETE",
      });
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen">

      {/* ===== FORM ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full md:w-1/3">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          {editSubject ? "Edit Subject" : "Add Subject"}
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="p-3 border text-black rounded-xl"
          />

          <input
            type="number"
            placeholder="Semester"
            value={Semester}
            onChange={(e) => setSemester(e.target.value)}
            className="p-3 border text-black rounded-xl"
          />

          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="p-3 border text-black rounded-xl"
          >
            <option value="">Select Course</option>
            {course.map((c) => (
              <option key={c._id} value={c._id}>
                {c.Coursename}
              </option>
            ))}
          </select>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white py-3 rounded-xl"
          >
            {editSubject ? "Update" : "Add"}
          </button>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div className="flex-1 overflow-scroll h-155">
        <h2 className="text-2xl font-bold mb-4 text-center">Subjects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((s) => (
            <div
              key={s._id}
              className="bg-green-600 p-4 rounded-xl shadow text-white"
            >
              <h3 className="text-xl font-semibold">
                {s.Subjectname}
              </h3>

              <p>Semester: {s.Semester}</p>

              {/* ✅ FIX — object render error solved */}
              <p>Course: {s.Courseid?.Coursename}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-400 p-2 rounded"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-400 p-2 rounded"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Subjects;

