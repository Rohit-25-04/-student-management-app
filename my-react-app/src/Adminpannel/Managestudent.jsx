//  import React, { useEffect, useState } from "react";

// function Managestudent() {
//   const [update, setupdate] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5001/api/student")
//       .then((res) => res.json())
//       .then((data) => setupdate(data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="flex  ">
//       <div className="border-2 flex flex-col gap-6 p-4">
//         {update.map((item, id) => (
//           <div key={id}>
//             <div  className="text-black border rounded w-screen pointer-courser border-black shadow-2xl"><h1>{item.Username}</h1>
//             <h1>{item.Password}</h1> </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Managestudent;
//  import React, { useEffect, useState } from "react";
// import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
 

// function Managestudent() {
//   const [students, setStudents] = useState([]);
//   const [editStudent, setEditStudent] = useState(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     const res = await fetch("http://localhost:5001/api/student");
//     const data = await res.json();
//     setStudents(data);
//   };

//   const handleEdit = (student) => {
//     setEditStudent(student);
//   };
//  const handleDelete = (student) => {
//     setEditStudent(student);
//   };

//   const handleChange = (e) => {
//     setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     await fetch(`http://localhost:5001/api/student/${editStudent._id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(editStudent),
//     });
//     setEditStudent(null);
//     fetchStudents();
//   };

//   return (
//     <div className="p-6">
//       {/* TABLE */}
//       <table className="w-full border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Name</th>
//             <th>Roll No</th>
//             <th>Course</th>
//             <th>Paid Fee</th>
//             <th>Total Fee</th>
//             <th>Gender</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((s) => (
//             <tr key={s._id} className="border bg-amber-200">
//               <td>{s.Name}</td>
//               <td>{s.Rollno}</td>
//               <td>{s.Course}</td>
//               <td>{s.Paidfee}</td>
//               <td>{s.Totalfee}</td>
//               <td>{s.Gender}</td>
//               <td>
//                 <button
//                   onClick={() => handleEdit(s)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded bg-white"
//                 >
//                   <PencilIcon className="h-5 w-5"/>
//                 </button>
//               </td>
//               {/* delete icon */}
//                 <td>
//                 <button
//                   onClick={() => handleDelete(s)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded bg-white"
//                 >
//                   < TrashIcon className="h-5 w-5"/>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* EDIT FORM */}
//       {editStudent && (
//         <div className="bg-gradient-to-b from-blue-400 to-pink-200 p-4 mt-6">
//           <div className="grid gap-4 grid-cols-2 md:grid-cols-4">

//             <Input label="Username" name="Username" value={editStudent.Username} onChange={handleChange} />
//             <Input label="Password" name="Password" value={editStudent.Password} onChange={handleChange} />
//             <Input label="Name" name="Name" value={editStudent.Name} onChange={handleChange} />
//             <Input label="Rollno" name="Rollno" value={editStudent.Rollno} onChange={handleChange} />
//             <Input label="Course" name="Course" value={editStudent.Course} onChange={handleChange} />
//             <Input label="Paidfee" name="Paidfee" value={editStudent.Paidfee} onChange={handleChange} />
//             <Input label="Totalfee" name="Totalfee" value={editStudent.Totalfee} onChange={handleChange} />
//             <Input label="Gender" name="Gender" value={editStudent.Gender} onChange={handleChange} />
//             <Input label="Role" name="Role" value={editStudent.Role} onChange={handleChange} />

//           </div>

//           <button
//             onClick={handleUpdate}
//             className="bg-green-600 text-white px-6 py-2 mt-4 rounded"
//           >
//             Update Student
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Reusable Input Component */
// const Input = ({ label, name, value, onChange }) => (
//   <div>
//     <h2 className="text-black">{label}</h2>
//     <input
//       className="border-2 border-black rounded w-full"
//       name={name}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// export default Managestudent;

//chatgpt
 import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

function Managestudent() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch students with populate
  useEffect(() => {
    fetchStudents();
  }, [page]);

  // Fetch courses for edit dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/course`);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/student?page=${page}`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const handleEdit = (student) => {
    setEditStudent({
      ...student,
      Course: student.Course?._id || "", // convert populated course to id
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/student/${id}`);
    fetchStudents();
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setEditStudent({
      ...editStudent,
      [e.target.name]: e.target.value,
    });
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/student/${editStudent._id}`, editStudent);
      setEditStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <span className="text-gray-600">Page {page}</span>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
               <th className="p-3">Email</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Course</th>
              <th className="p-3">Paid Fee</th>
              <th className="p-3">Total Fee</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, i) => (
              <tr
                key={s._id}
                className={`border-b text-center ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="p-3 text-black">{s.Name}</td>
                <td className="p-3 text-black">{s.Email}</td>
                <td className="p-3 text-black">{s.Rollno}</td>
                <td className="p-3 text-black">{s.Course?.Coursename || "N/A"}</td>
                <td className="p-3 text-black">{s.Paidfee}</td>
                <td className="p-3 text-black">{s.Totalfee}</td>
                <td className="p-3 text-black">{s.Gender}</td>
                <td className="p-3 text-black ">{s.Semester}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Prev
        </button>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">{page}</button>

        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {editStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-black">Edit Student</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input label="Name" name="Name" value={editStudent.Name} onChange={handleChange} />
               <Input label="Email" name="Email" value={editStudent.Email} onChange={handleChange} />
              <Input label="Roll No" name="Rollno" value={editStudent.Rollno} onChange={handleChange} />
              <Input label="Paid Fee" name="Paidfee" value={editStudent.Paidfee} onChange={handleChange} />
              <Input label="Total Fee" name="Totalfee" value={editStudent.Totalfee} onChange={handleChange} />
              <Input label="Semester" name="Semester" value={editStudent.Semester} onChange={handleChange} />
              <Input label="Gender" name="Gender" value={editStudent.Gender} onChange={handleChange} />
              
              {/* Course dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-black">Course</label>
                <select
                  name="Course"
                  value={editStudent.Course}
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2"
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

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditStudent(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// INPUT COMPONENT
const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-black">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-gray-400 rounded p-2 !text-black !bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Managestudent;
