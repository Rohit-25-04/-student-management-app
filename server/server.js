  import dotenv from "dotenv";
dotenv.config();

import session from "express-session";
 import express, { json } from "express";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cors from "cors";
import { Teachers, Subject ,Exam} from "./Models/Teacher.js";
import Staff from "./Routes/Staff.js";
import Courseroute from "./Routes/Courses.js";
import Courses from "./Models/Course.js";
import transporter from "./Models/Mailer.js";
const app = express();
app.use(cors({
  origin: "https://collage-management-app.netlify.app/",
  credentials:true,
}));
app.use(express.json());
   app.set("trust proxy", 1);   // ⭐ VERY IMPORTANT for Render

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "none",   // ⭐ cross-site ke liye
    secure: true        // ⭐ HTTPS required (Render + Netlify both https)
  }
}));


// Routes
app.use("/api", Staff);
app.use("/api/Courses", Courseroute);

// -------------------- SCHEMAS & MODELS --------------------
const userSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  role: String
});
const User = mongoose.model("managements", userSchema);

const studentSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Name: String,
  Email:String,
  Rollno: String,
  Semester:String,
  Course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses"
  },
  Paidfee: String,
  Totalfee: String,
  Gender: String,
  Role: String,
});
const Student = mongoose.model("Students", studentSchema);
//for specific notice
const specificnotice=mongoose.Schema({
  Student:({
    type:mongoose.Schema.Types.ObjectId,
    ref:"Students"
  }),
  Title:String,
  Description:String,
})
const specific=mongoose.model("Specificnotices",specificnotice)
// -------------------- Migration for old students --------------------
 

// -------------------- MongoDB Connection --------------------
 mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");

    // ✅ Run migration after Student model is defined
   
  })
  .catch((err) => console.log(err));

// -------------------- ROUTES --------------------
  app.post("/api/specific", async (req, res) => {
  try {
    const { Studentid, title, description } = req.body;

    // 1️⃣ Find student
    const student = await Student.findById(Studentid);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // 2️⃣ Save specific notice in DB
    const newNotice = new specific({
      Student: student._id,
      Title: title,
      Description: description,
    });
    await newNotice.save();

    // 3️⃣ Send email
    await transporter.sendMail({
      from: "rohiirwt08@gmail.com",      // your Gmail
      to: student.Email,                // student email
      subject: title,
      text: description,
    });

    res.json({ message: "Notice saved & email sent successfully" });

  } catch (err) {
    console.error("Error in sending specific notice:", err);
    res.status(500).json({ message: "Failed to send email", error: err.message });
  }
});




// GET student gender count
app.get("/api/student/gender", async (req, res) => {
  const malegender = await Student.countDocuments({ Gender: "male" });
  const femalegender = await Student.countDocuments({ Gender: "female" });
  res.json({ male: malegender, female: femalegender });
});

// GET counts for stats
app.get("/api/stats/type", async (req, res) => {
  try {
    const studentcount = await Student.countDocuments();
    const Staffcount = await Teachers.countDocuments();
    res.json({ Student: studentcount, Teachers: Staffcount });
  } catch (err) {
    console.log(err);
  }
});

// GET students with pagination & populate course name
app.get("/api/student", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;

  const students = await Student.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("Course", "Coursename");

  res.json(students);
});

// Add new student
app.post("/api/student", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    const populatedStudent = await newStudent.populate("Course", "Coursename");
    res.json({ message: "Student Added", Student: populatedStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding student", error: err.message });
  }
});

// Update student
app.put("/api/student/:id", async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const populatedStudent = await updatedStudent.populate("Course", "Coursename");
  res.json(populatedStudent);
});

// Delete student
app.delete("/api/student/:id", async (req, res) => {
  const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student Deleted", Student: deletedStudent });
});

// Courses
app.get("/api/course", async (req, res) => {
  const coursedata = await Courses.find();
  res.json(coursedata);
});
//no of course

app.get("/api/course/stats",async(req,res)=>{
    const nocourse=await Courses.countDocuments();
    res.json(nocourse)
})

// Login API
 app.post("/api/login", async (req, res) => {
   console.log("BODY RECEIVED:", req.body); 
  const { Username, Password } = req.body;
  // Check admin/teacher first
  const user = await User.findOne({ Username: Username.trim(), Password: Password.trim() });
  if (user) {
    req.session.user = {
      id: user._id,
      role: user.role,   // admin/teachercd
      Username: user.Username
    };
    console.log("MATCHED USER:", user);

    return res.json({ role: user.role });
  }

  // Check student
  const student = await Student.findOne({ Username: Username.trim(), Password: Password.trim() }).populate("Course", "Coursename");
  
  if (student) {
    req.session.user = {
      id: student._id,
      role: student.Role,  // student
      Username: student.Username,
      Name: student.Name,
      Email:student.Email,
      Rollno:student.Rollno,
      Gender:student.Gender,
      Course:student.Course,
      Paidfee:student.Paidfee,
      Semester:student.Semester,
      Totalfee:student.Totalfee,
    };
    return res.json({ role: student.Role, Name:student.Name,Email:student.Email,
      Rollno:student.Rollno,
      Gender:student.Gender,
      Course:student.Course,
      Paidfee:student.Paidfee,
      Totalfee:student.Totalfee,});
  }
  //teacher
  const teacher=await Teachers.findOne({Username: Username.trim(),Password: Password.trim()})
if(teacher){
  req.session.user={
    id:teacher._id,
    Username:teacher.Username,
    Password:teacher.Password,
    role:teacher.Role,
    Course:teacher.Course
  }
  return res.json({role:teacher.Role,Course:teacher.Course})
}

  // If neither found
  return res.status(401).json({ message: "Invalid Username or Password" });
});

app.get("/api/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.session.user);
});
  app.post("/api/mark", async (req, res) => {
  const { subjectid } = req.body;

  const subject = await Subject.findById(subjectid);
  console.log("SUBJECT FOUND 👉", subject);

  const students = await Student.find({
    Semester: subject.Semester,
    Course: subject.Courseid,
  });

  console.log("STUDENTS FOUND 👉", students);

  res.json(students);
});


 app.get("/api/mystudent", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "teacher") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const teacherCourse = req.session.user.Course;

    const students = await Student.find({
      Course: teacherCourse
    }).populate("Course", "Coursename");

    res.json(students);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error loading students" });
  }
});

 
//authcheck
app.get("/api/authcheck",async(req,res)=>{
  if(req.session.user)
    return res.json({loggedin:true,role:req.session.user.role})
  else{
    return res.status(404).json({message:"loggedin failed"})
  }
})

// -------------------- SERVER START --------------------
 const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
