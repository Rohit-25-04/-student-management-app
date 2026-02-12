import express from "express"
 import Course from "../Models/Course.js"
 
const router=express.Router()
router.post("/",async(req,res)=>{
    const Courses =  await new Course(req.body)
    await Courses.save()
    res.json({message:"course is added",Courses})
})
 
//get
router.get("/",async(req,res)=>{
    const course=await Course.find()
    res.json(course)
})
 

export default router