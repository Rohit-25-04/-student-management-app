 import React, { useEffect, useState } from "react";
import axios from "axios";

function TeacherAttendanceUI() {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [duration, setDuration] = useState(5);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceWindow, setAttendanceWindow] = useState(null);
  const [teacher, setTeacher] = useState(null); // ✅ logged-in teacher from session

  // ---------------- Fetch data ----------------
  useEffect(() => {
    // Subjects
    axios.get(`${import.meta.env.VITE_API_URL}/api/subject`, { withCredentials: true })
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err));

    // Courses
    axios.get(`${import.meta.env.VITE_API_URL}/api/course`, { withCredentials: true })
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));

    // Teacher info from session
    axios.get(`${import.meta.env.VITE_API_URL}/api/me`, { withCredentials: true })
      .then(res => {
        if (res.data.role === "teacher") setTeacher(res.data);
      })
      .catch(err => console.log("Teacher fetch failed:", err));
  }, []);

  // ---------------- Open Attendance ----------------
  const openAttendance = async () => {
    if (!selectedCourse || !selectedSubject) return alert("Select course & subject");
    if (!teacher) return alert("Teacher not loaded yet");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/attendancesession`,
        {
          courseId: selectedCourse,
          subjectId: selectedSubject,
          semester: "1",      // ya dynamic semester
          duration: duration  // in minutes
        },
        { withCredentials: true }
      );

      setAttendanceWindow(res.data.session);
      alert("Attendance window opened!");
    } catch (err) {
      console.error("Attendance open failed:", err);
      alert("Failed to open attendance. Check console.");
    }
  };

  // ---------------- Countdown effect ----------------
  useEffect(() => {
    if (!attendanceWindow) return;

    const interval = setInterval(async () => {
      const now = new Date();
      if (now >= new Date(attendanceWindow.endTime)) {
        clearInterval(interval);
        alert("Attendance closed!");
        setAttendanceWindow(null);

        try {
          await axios.put(
            ` ${import.meta.env.VITE_API_URL}/api/attendancesession/${attendanceWindow._id}/close`,
            {},
            { withCredentials: true }
          );
        } catch (err) {
          console.error("Failed to close session:", err);
        }
      }
    }, 1000 * 10); // demo 10s, real: 60000

    return () => clearInterval(interval);
  }, [attendanceWindow]);

  // ---------------- UI ----------------
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-4 text-black font-bold">📋 Teacher Attendance Panel</h2>

      <div className="grid grid-cols-1   w-full md:grid-cols-4 gap-4 mb-6">
        <select
          className="border text-black border-black p-2 w-62 max-w-full rounded "
          onChange={e => setSelectedCourse(e.target.value)}
          value={selectedCourse}
        >
          <option className="w-20px" value="">Select Course</option>
          {courses.map(c => <option key={c._id} className="text-black" value={c._id}>{c.Coursename} </option>)}
        </select>

        <select
          className="border text-black border-black p-2  w-62 max-w-full rounded"
          onChange={e => setSelectedSubject(e.target.value)}
          value={selectedSubject}
        >
          <option  value="">Select Subject</option>
          {subjects.map(s => <option key={s._id} value={s._id}>{s.Subjectname}</option>)}
        </select>

        <input
          type="number"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          placeholder="Duration (min)"
          className="border  w-62 max-w-full text-black p-2 rounded"
        />

        <button
          onClick={openAttendance}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Open Attendance
        </button>
      </div>

      {attendanceWindow && (
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 font-semibold rounded">
          Attendance is OPEN! ⏰ Ends at {new Date(attendanceWindow.endTime).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

export default TeacherAttendanceUI;
