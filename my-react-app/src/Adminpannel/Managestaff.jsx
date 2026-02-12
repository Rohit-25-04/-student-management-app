import React, { useEffect, useState } from "react";
function Staff(){
    const[staff,setstaff]=useState([])
    useEffect(()=>{fetchteacher()},[])
    const fetchteacher=async()=>{
        try{
            const response=await fetch(`${import.meta.env.VITE_API_URL}/api/teacher`)
            const data= await response.json()
            setstaff(data)
        }
        catch(err){
            console.log(err)
        }
    }
    return(<>
    <div className="w-full p-8">
<div className="overflow-x-auto bg-gray-300 rounded-l-lg shadow">
<table  className="text-sm  w-full">
<thead className="bg-blue-400 text-white rounded">
  <tr>
    <th className="p-3 text-center">Username</th>
    <th className="p-3 text-center">Password</th>
    <th className="p-3 text-center">Name</th>
    <th className="p-3 text-center">Salary</th>
    <th className="p-3 text-center">Phone-no</th>
    <th className="p-3 text-center">Email</th>
    <th className="p-3 text-center">Course</th>
    <th className="p-3 text-center">Role</th>
    <th className="p-3 text-center">Gender</th>
  </tr>
</thead>

    <tbody>
        {staff.map((s,i)=>
        <tr key={s._id||i}
        className="text-center">
 <td className="p-4 text-black">{s.Username}</td>
                <td className=" p-4 text-black">{s.Password}</td>
                <td className=" p-4 text-black">{s.Name}</td>
                <td className=" p-4 text-black">{s.Salary}</td>
                <td className=" p-4 text-black">{s.Phone}</td>
                <td className=" p-4 text-black">{s.Email}</td>
                <td className=" p-4 text-black">{s.Course}</td>
                <td className=" p-4 text-black">{s.Role}</td>
                <td className=" p-4 text-black">{s.Gender}</td>


        </tr>
        )}
    </tbody>
</table>


</div>
    </div>
    </>)
}export default Staff