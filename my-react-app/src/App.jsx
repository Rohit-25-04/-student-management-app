//  import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Nav from "./Nav";

// function App() {
//   return (
//     <>
    

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
 import React from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Student from "./Children"
import Admin from "./Admin"
 import Teacher from "./Teacherpannel/Teacherhome"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<Student />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/teacher" element={<Teacher/>}/>
    </Routes>
  )
}
export default App
