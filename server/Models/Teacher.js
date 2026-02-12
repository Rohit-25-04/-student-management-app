 import mongoose, { mongo } from "mongoose";
  import Courses from "./Course.js";  // ✅ relative path, same folder


const teacherSchema = new mongoose.Schema({
  Username: String,
  Password: String,
  Name: String,
  Salary: String,
  Phone: String,
  Email: String,
  Course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses",
  },
  Role: String,
  Gender: String,
});

const Subjectschema=new mongoose.Schema({
Subjectname:String,
 Courseid:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Courses",//course model name
 },
Semester:String
})
const examschema= new mongoose.Schema({
  ExamName:String,
  Date:String,
  Subject:String,
  Course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Courses"
  },
  Semester:String,
}) 
const noticeschema = new mongoose.Schema(
  {
    Title: String,
    Description: String,
    Level: String,
  },
  {
    timestamps: true   // ✅ ADD THIS
  }
);


 const attendanceSessionSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teachers"
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses"
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects"
  },
  semester: String,

  startTime: Date,
  endTime: Date,

  isActive: {
    type: Boolean,
    default: true
  }
});
 

const attendanceSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendancesession",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
  },
  status: { type: String, enum: ["present", "absent"], default: "absent" },
  timestamp: { type: Date, default: Date.now },
});

 const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Students",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  exam: {
    type: String, // Internal / Mid / Final
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

marksSchema.index(
  { student: 1, subject: 1, exam: 1 },
  { unique: true }
);

export const Mark = mongoose.model("Marks", marksSchema);

//  Marksschema.index({ Student: 1, Exam: 1 }, { unique: true });
 

export const Attendance = mongoose.model("Attendance", attendanceSchema);

export  const AttendanceSession=mongoose.model("Attendancesession",attendanceSessionSchema)
 
export const Notice=mongoose.model("Notice",noticeschema)
export  const Exam = mongoose.model("Exam",examschema)
 export const Subject = mongoose.model("Subject",Subjectschema)

export const Teachers = mongoose.model("Teachers", teacherSchema);

 

