// //   import React, { useEffect, useState } from "react";
// //   function Home(){
// //     const[detail,setdetail]=useState({
// //       Username:"",
// //       Password:"",
// //       Email:"",
// //       Phoneno:""
// //   })
// //   const[contacts,setcontacts]=useState([])

// //   const[selectedindex,setselectedindex]=useState(null)//index find krne ki kiska chhnage krre h
// //   const[mode,setmode]=useState("create")//show ,edit
// //    const change=(e)=>{
// //  const{name,value}=e.target
// // setdetail((prev)=>({
// //   ...prev,
// //   [name]:value
// // }))
// //    }
// //       useEffect(() => {
// //     fetch("http://localhost:5000/api/contacts")
// //       .then((res) => res.json())
// //       .then((data) => setcontacts(data))
// //       .catch((err) => console.log(err));
// //   }, []);

// //    const submit=()=>{
// //     if(mode==="edit"){
// //  fetch(`http://localhost:5001/api/contacts/${selectedindex}`,{
// //   method:"PUT",
// //   headers:{"content-Type":"application/json"},
// // body:josn.stringify(detail),
// // })
// //  .then((res)=>res.json())
// //  .then((data)=>setcontacts(data.contacts))
// //  .catch((err)=>console.log(err)) ;
// // } else{
// //    fetch("http://localhost:5001/api/contacts",{
// //     method:"POST",
// //     headers:{"content-Type":"application/json"},
// //     body:json.stringify(detail),
// //    })
// //    .then((res)=>res.json())
// //    .then((data)=>setcontacts(data.contacts))
// //    .then((err)=>console.log(err))
// // }
// //  setdetail({ Username: "", Password: "", Email: "", Phoneno: "" })

// // setmode("create")
// // setselectedindex(null)

// //    }
// //    const show=(index)=>{
// // setdetail(contacts[index])
// // setselectedindex(index)
// // setmode("show")
// //    }
// //      const edit=(index)=>{
// // setdetail(contacts[index])
// // setselectedindex(index)
// // setmode("edit")
// //    }
// //      const cancel=()=>{
// //  setdetail({ Username: "", Password: "", Email: "", Phoneno: "" })

// // setselectedindex(null)
// // setmode("create")
// //    }
// //     return(
// //         <>
// //         <h1 className="text-red-500">Contact form</h1>
        
// //         <div className="grid place-content-center mt-15"> 
// //           <div className=" grid gap-4 border border-black w-77"> 
// //         <div><h2 className="text-black">username</h2>
// //             <input className="text-black"
// //              type="text"
// //             placeholder="enter your username"
// //             value={detail.Username}
// //             name="Username"
// //             onChange={change}
// //                         disabled={mode === "show"}

// //             />
// //         </div>
// //           <div><h2 className="text-black">Password</h2>
// //             <input className="text-black"
// //              type="Password"
// //             placeholder="enter your password"
// //             value={detail.Password}
// //             name="Password"
// //             onChange={change}
// //                         disabled={mode === "show"}

// //             />
// //         </div>
// //           <div><h2 className="text-black">E-mail</h2>
// //             <input className="text-black"
// //              type="email"
// //             placeholder="enter your Email"
// //             value={detail.Email}
// //             name="Email"
// //             onChange={change}
// //                         disabled={mode === "show"}

// //             />
// //         </div>
// //           <div><h2 className="text-black">Phone number</h2>
// //             <input className="text-black"
// //              type="text"
// //             placeholder="enter your phoneno"
// //             name="Phoneno"
// //             value={detail.Phoneno}
// //             onChange={change}
// //                         disabled={mode === "show"}

// //             />
// //         </div>
// //          <button className="bg-blue-400"onClick={submit}>
// //           {mode==="edit"?"update":"submit"}</button>
// //           {mode!=="create"&&(<button onClick={cancel}>cancel</button>)}
// //         </div>
// //         <div className="mt-10">
// //           <div>{contacts.map((item,id)=>(
// //             <div key={id}><div className=" justify-between flex border-2 border-amber-200 h-12"><h2 className="text-red-400">{item.Username}</h2>
// //             <button onClick={()=>show(id)}>show</button>
// //             <button onClick={()=>edit(id)}>edit</button></div> </div>
// //           ))}</div>
// //           </div></div>
// //         </>
// //     )
// //   }export default Home
// // import React, { useState, useEffect } from "react";

// // function Home() {
// //   const emptyForm = { Username: "", Password: "", Email: "", Phoneno: "" };

// //   const [detail, setDetail] = useState(emptyForm);
// //   const [contacts, setContacts] = useState([]);
// //   const [selectedIndex, setSelectedIndex] = useState(null);
// //   const [mode, setMode] = useState("create"); // create | show | edit

// //   const change = (e) => {
// //     const { name, value } = e.target;
// //     setDetail((prev) => ({ ...prev, [name]: value }));
// //   };

// //   // Fetch contacts on component mount
// //   useEffect(() => {
// //     fetch("http://localhost:5001/api/contacts")
// //       .then((res) => res.json())
// //       .then((data) => setContacts(data))
// //       .catch((err) => console.log(err));
// //   }, []);

// //   const submit = () => {
// //     if (mode === "edit") {
// //       fetch(`http://localhost:5001/api/contacts/${selectedIndex}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(detail),
// //       })
// //         .then((res) => res.json())
// //         .then((data) => setContacts(data.contacts))
// //         .catch((err) => console.log(err));
// //     } else {
// //       fetch("http://localhost:5001/api/contacts", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(detail),
// //       })
// //         .then((res) => res.json())
// //         .then((data) => setContacts(data.contacts))
// //         .catch((err) => console.log(err));
// //     }

// //     setDetail(emptyForm);
// //     setMode("create");
// //     setSelectedIndex(null);
// //   };

// //   const show = (index) => {
// //     setDetail(contacts[index]);
// //     setSelectedIndex(index);
// //     setMode("show");
// //   };

// //   const edit = (index) => {
// //     setDetail(contacts[index]);
// //     setSelectedIndex(index);
// //     setMode("edit");
// //   };

// //   const cancel = () => {
// //     setDetail(emptyForm);
// //     setSelectedIndex(null);
// //     setMode("create");
// //   };

// //   const remove = (index) => {
// //     fetch(`http://localhost:5001/api/contacts/${index}`, {
// //       method: "DELETE",
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setContacts(data.contacts))
// //       .catch((err) => console.log(err));
// //   };

// //   return (
// //     <>
// //       <h1 className="text-red-500 text-xl text-center mb-4">Contact Form</h1>

// //       {/* FORM */}
// //       <div className="grid place-content-center">
// //         <div className="grid gap-3 border border-black p-4 w-80">
// //           <input
// //             type="text"
// //             placeholder="Username"
// //             name="Username"
// //             value={detail.Username}
// //             onChange={change}
// //             disabled={mode === "show"}
// //             className="text-black border p-1"
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             name="Password"
// //             value={detail.Password}
// //             onChange={change}
// //             disabled={mode === "show"}
// //             className="text-black border p-1"
// //           />
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             name="Email"
// //             value={detail.Email}
// //             onChange={change}
// //             disabled={mode === "show"}
// //             className="text-black border p-1"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Phone No"
// //             name="Phoneno"
// //             value={detail.Phoneno}
// //             onChange={change}
// //             disabled={mode === "show"}
// //             className="text-black border p-1"
// //           />

// //           <div className="flex gap-2 mt-2">
// //             <button
// //               onClick={submit}
// //               className="bg-blue-400 px-3 py-1 text-white"
// //             >
// //               {mode === "edit" ? "Update" : "Submit"}
// //             </button>

// //             {mode !== "create" && (
// //               <button onClick={cancel} className="bg-gray-400 px-3 py-1 text-white">
// //                 Cancel
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* CONTACT LIST */}
// //       <div className="mt-8 grid place-content-center">
// //         {contacts.map((item, id) => (
// //           <div
// //             key={id}
// //             className="flex justify-between items-center border w-80 p-2 mb-2"
// //           >
// //             <span className="text-black">{item.Username}</span>

// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => show(id)}
// //                 className="bg-yellow-300 px-2"
// //               >
// //                 Show
// //               </button>

// //               <button
// //                 onClick={() => edit(id)}
// //                 className="bg-green-400 px-2"
// //               >
// //                 Edit
// //               </button>

// //               <button
// //                 onClick={() => remove(id)}
// //                 className="bg-red-400 px-2 text-white"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </>
// //   );
// // }

// // export default Home;
//  import React, { useState, useEffect } from "react";

// function Home() {
//   const emptyForm = { Username: "", Password: "", Email: "", Phoneno: "" };
//   const [detail, setDetail] = useState(emptyForm);
//   const [contacts, setContacts] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [mode, setMode] = useState("create"); // create | show | edit

//   // Change handler for inputs
//   const change = (e) => {
//     const { name, value } = e.target;
//     setDetail((prev) => ({ ...prev, [name]: value }));
//   };

//   // Fetch latest contacts
//   const fetchContacts = () => {
//     fetch("http://localhost:5001/api/contacts")
//       .then((res) => res.json())
//       .then((data) => setContacts(data))
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   // Submit form (create or edit)
//   const submit = () => {
//     if (mode === "edit") {
//       fetch(`http://localhost:5001/api/contacts/${selectedId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(detail),
//       })
//         .then(() => fetchContacts())
//         .catch((err) => console.log(err));
//     } else {
//       fetch("http://localhost:5001/api/contacts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(detail),
//       })
//         .then(() => fetchContacts())
//         .catch((err) => console.log(err));
//     }

//     setDetail(emptyForm);
//     setMode("create");
//     setSelectedId(null);
//   };

//   // Show contact details (read-only)
//   const show = (contact) => {
//     setDetail(contact);
//     setSelectedId(contact._id);
//     setMode("show");
//   };

//   // Edit contact
//   const edit = (contact) => {
//     setDetail(contact);
//     setSelectedId(contact._id);
//     setMode("edit");
//   };

//   // Cancel editing/showing
//   const cancel = () => {
//     setDetail(emptyForm);
//     setSelectedId(null);
//     setMode("create");
//   };

//   // Delete contact
//   const remove = (id) => {
//     fetch(`http://localhost:5001/api/contacts/${id}`, {
//       method: "DELETE",
//     })
//       .then(() => fetchContacts())
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <h1 className="text-red-500 text-xl text-center mb-4">Contact Form</h1>

//       {/* FORM */}
//       <div className="grid place-content-center">
//         <div className="grid gap-3 border border-black p-4 w-80">
//           <input
//             type="text"
//             placeholder="Username"
//             name="Username"
//             value={detail.Username}
//             onChange={change}
//             disabled={mode === "show"}
//             className="text-black border p-1"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             name="Password"
//             value={detail.Password}
//             onChange={change}
//             disabled={mode === "show"}
//             className="text-black border p-1"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             name="Email"
//             value={detail.Email}
//             onChange={change}
//             disabled={mode === "show"}
//             className="text-black border p-1"
//           />
//           <input
//             type="text"
//             placeholder="Phone No"
//             name="Phoneno"
//             value={detail.Phoneno}
//             onChange={change}
//             disabled={mode === "show"}
//             className="text-black border p-1"
//           />

//           <div className="flex gap-2 mt-2">
//             <button
//               onClick={submit}
//               className="bg-blue-400 px-3 py-1 text-white"
//             >
//               {mode === "edit" ? "Update" : "Submit"}
//             </button>
//             {mode !== "create" && (
//               <button
//                 onClick={cancel}
//                 className="bg-gray-400 px-3 py-1 text-white"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* CONTACT LIST */}
//       <div className="mt-8 grid place-content-center">
//         {contacts.map((item) => (
//           <div
//             key={item._id}
//             className="flex justify-between items-center border w-80 p-2 mb-2"
//           >
//             <span className="text-black">{item.Username}</span>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => show(item)}
//                 className="bg-yellow-300 px-2"
//               >
//                 Show
//               </button>

//               <button
//                 onClick={() => edit(item)}
//                 className="bg-green-400 px-2"
//               >
//                 Edit
//               </button>

//               <button
//                 onClick={() => remove(item._id)}
//                 className="bg-red-400 px-2 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Home; 
 import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-purple-500 to-indigo-600">
      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12 text-white text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Welcome to Student Management
        </h1>

        <p className="text-base sm:text-lg mb-4">
          Manage your students, teachers, and courses easily.
        </p>

        <p className="text-base sm:text-lg">
          Track attendance, grades, and more in one place.
        </p>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white md:rounded-l-3xl shadow-xl px-6 sm:px-10 md:p-12 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
          Student Management App
        </h2>

        <p className="text-gray-600 text-center mb-8 text-sm sm:text-base max-w-md">
          Simplify your educational workflow and manage everything at one place.
        </p>

        <button
          onClick={handleStart}
          className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition text-base sm:text-lg shadow-md hover:shadow-lg"
        >
          Start
        </button>
      </div>
    </div>
  );
}