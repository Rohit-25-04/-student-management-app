 import express from "express";
import { Teachers, Subject, Exam, Notice, AttendanceSession,Attendance,Mark } from "../Models/Teacher.js";

const router = express.Router();

// ---------------- Existing routes ----------------
router.get("/teacher", async (req, res) => {
  const teacher = await Teachers.find();
  res.json(teacher);
});

router.post("/teacher", async (req, res) => {
  console.log("POST /api/teacher hit", req.body);
  const teacher = new Teachers(req.body);
  await teacher.save();
  res.json({ message: "Staff is Added", teacher });
});

router.get("/subject", async (req, res) => {
  const subject = await Subject.find().populate("Courseid", "Coursename");
  res.json(subject);
});
router.get("/subject/stats", async (req, res) => {
  const subjectcount = await Subject.countDocuments()
  res.json(subjectcount);
});
router.post("/subject", async (req, res) => {
  const subject = new Subject(req.body);
  await subject.save();
  res.json({ message: "subject is added", subject });
});
router.delete("/subject/:id", async (req, res) => {
  const deleted = await Subject.findOneAndDelete(req.body);
  res.json({ message: "subject is added", Subject:deleted});
});

// ---------------- Existing exam routes ----------------
router.get("/exam", async (req, res) => {
  const exam = await Exam.find();
  res.json(exam);
});

router.post("/exam", async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.json({ message: "exam is added", exam });
});

router.post("/exam/:id", async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "exam is updated", exam });
});


//marks
 router.post("/marks", async (req, res) => {
  try {
    const { subject, exam, marks } = req.body;

    for (let studentId in marks) {
      await Mark.findOneAndUpdate(
        { student: studentId, subject, exam },
        {
          student: studentId,
          subject,
          exam,
          marks: Number(marks[studentId]),
        },
        { upsert: true, new: true }
      );
    }
    res.json({ message: "Marks saved successfully" });
  } catch (err) {
    console.error("MARK SAVE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});
//marks
// Get marks for logged-in student
router.get("/student/marks", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "student") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const marks = await Mark.find({
      student: req.session.user.id,
    }).populate("subject", "Subjectname");

    res.json(marks);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch marks" });
  }
});


// ---------------- Existing notice routes ----------------
router.post("/notice", async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json({ message: "notice is send", notice });
});

router.delete("/notice/:id", async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Notice deleted" });
});

router.get("/notice", async (req, res) => {
  const notice = await Notice.find();
  res.json(notice);
});

// ---------------- Existing logout route ----------------
router.post("/logout", async (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('connect.sid');
    res.json({ message: "logout successfull" });
  });
});

// ----------------- NEW: Attendance Session Routes -----------------

// Get all attendance sessions for logged-in teacher
router.get("/attendancesession", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "teacher") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const sessions = await AttendanceSession.find({ teacherId: req.session.user.id })
      .populate("teacherId", "Name")
      .populate("courseId", "Coursename")
      .populate("subjectId", "Subjectname");

    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch attendance sessions" });
  }
});

router.get("/attendance/active", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "student") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const student = req.session.user;

    const active = await AttendanceSession.findOne({
      isActive: true,
      courseId: student.Course._id, 
      semester: student.Semester
    })
    .populate("subjectId", "Subjectname");

    res.json(active);

  } catch (err) {
    console.error(err);
    res.status(200).json({ message: "Failed to fetch active session" });
  }
});
// Create new attendance session
router.post("/attendancesession", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "teacher") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { courseId, subjectId, semester, duration } = req.body;

    const startTime = new Date();
    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + (duration || 5));

    const newSession = new AttendanceSession({
      teacherId: req.session.user.id, // ✅ teacherId from session
      courseId,
      subjectId,
      semester,
      startTime,
      endTime,
      isActive: true
    });

    await newSession.save();

    res.json({ message: "Attendance session created", session: newSession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create attendance session" });
  }
});

// Close attendance session manually
router.put("/attendancesession/:id/close", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "teacher") {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedSession = await AttendanceSession.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    res.json({ message: "Attendance session closed", session: updatedSession });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to close attendance session" });
  }
});// Mark attendance for a student
router.post("/attendance/mark", async (req, res) => {
  const { sessionId, studentId, status } = req.body;

  try {
    const existing = await Attendance.findOne({ sessionId, studentId });
    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json({ message: "Attendance updated", attendance: existing });
    }

    const newAttendance = new Attendance({ sessionId, studentId, status });
    await newAttendance.save();
    res.json({ message: "Attendance marked", attendance: newAttendance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark attendance" });
  }
});
//teachrs student route
 

// ------------------------------------------------------

console.log("Attendance routes loaded");
export default router;
