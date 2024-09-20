const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "public"))); // Adjust this if your build folder is named differently

// Database configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dani, 2023",
  database: "students",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// API endpoints

// Add a new user
app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student added successfully" });
  });
});

// Get all students
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student_details";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Get a specific student by ID
app.get("/get_student/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM student_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Edit a user
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE student_details SET `name`=?, `email`=?, `age`=?, `gender`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.gender,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student updated successfully" });
  });
});

// Delete a user
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occurred: " + err });
    return res.json({ success: "Student deleted successfully" });
  });
});

// Custom search endpoint
app.post("/custom_search", (req, res) => {
  const { query } = req.body; // Get search query
  const sql = `SELECT * FROM student_details WHERE name LIKE ?`;
  const values = [`%${query}%`]; // Use LIKE for searching

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ message: "Server error" });
    }
    return res.json(result);
  });
});

// Serve the React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // Adjust this if your build folder is named differently
});

// Start the server
const port = process.env.PORT || 5000; // Use environment variable for port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});