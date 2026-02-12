import mongoose from "mongoose";
const courseschema=new mongoose.Schema({
Coursename:String,
Duration:String,
Totalsubject:String,
})
const Courses=mongoose.model("Courses",courseschema)
export default Courses
