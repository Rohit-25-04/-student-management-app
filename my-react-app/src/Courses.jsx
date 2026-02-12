import React, { useState } from "react";

function AdminCoursesUI() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Computer Science" },
    { id: 2, name: "Mathematics" },
  ]);
  const [courseName, setCourseName] = useState("");

  // Dummy add course function
  const handleAddCourse = () => {
    if (!courseName.trim()) return;
    const newCourse = { id: Date.now(), name: courseName };
    setCourses([...courses, newCourse]);
    setCourseName("");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Courses Management</h2>

      {/* Input field to add course */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="flex-1 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* List of courses */}
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Course Name</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course.id} className="border-b">
                <td className="p-2">{course.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-2 text-center text-gray-500">No courses added yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCoursesUI;
