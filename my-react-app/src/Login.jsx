//  import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// function Login() {
//   const [Username, setUsername] = useState("")
//   const [Password, setPassword] = useState("")
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await axios.post("http://localhost:5001/api/login", {
//         Username,
//         Password,
//       })

//       const role = res.data.role

//       if (role === "admin") navigate("/admin")
//       else if (role === "teacher") navigate("/teacher")
//       else if (role === "student") navigate("/student")

//     } catch (err) {
//       alert("Invalid email or password")
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
//       <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Student Management Login
//         </h2>

//         <form onSubmit={handleLogin} className="flex flex-col">
//           <input
//             type="text"
//             placeholder="Username"
//             value={Username}
//             onChange={e => setUsername(e.target.value)}
//             className="mb-4 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             className="mb-6 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [Username, setUsername] = useState("");  // Capital U
  const [Password, setPassword] = useState("");  // Capital P
  const navigate = useNavigate();
 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      { Username, Password },
      { withCredentials: true }
    );

    console.log("LOGIN RES 👉", res.data);

    const role = res.data.role;

    if (role === "admin") navigate("/admin");
    else if (role === "teacher") navigate("/teacher");
    else if (role === "student") navigate("/student");
    else alert("Role not recognized");

  } catch (err) {
    console.log("LOGIN ERROR 👉", err.response?.data || err.message);
    alert("Invalid Username or Password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Management Login
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={Username}
            onChange={e => setUsername(e.target.value)}
            className="mb-4 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={e => setPassword(e.target.value)}
            className="mb-6 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
