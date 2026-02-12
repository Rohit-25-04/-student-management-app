import React from "react";
import { Link } from "react-router-dom";
 function Nav(){
    return(
        <>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        </>
    )
 }export default Nav