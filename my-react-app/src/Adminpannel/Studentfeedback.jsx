 import React, { useState } from "react";

function StudentFeedback() {
  const [feedback, setFeedback] = useState({
    name: "",
    rollno: "",
    course: "",
    message: ""
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Feedback:", feedback);
    alert("Feedback submitted! Check console.");
    setFeedback({ name: "", rollno: "", course: "", message: "" });
  };

  return (
    <div className="min-h-full bg-gray-100 flex items-center justify-center">
      {/* Form Card */}
      <div className="max-w-md w-full p-6  bg-blue-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Student Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Roll No</label>
            <input
              type="text"
              name="rollno"
              value={feedback.rollno}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Roll No"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Course</label>
            <input
              type="text"
              name="course"
              value={feedback.course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Course"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Feedback</label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Write your feedback"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentFeedback;
