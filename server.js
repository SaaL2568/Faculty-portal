import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://sam_iwp:hHqH9Azx8Fid7Sv4@facultydata.5nax90y.mongodb.net/?retryWrites=true&w=majority&appName=FacultyData", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const professorSchema = new mongoose.Schema({
  name: String,
  about: String,
  research: String,
  publications: String,
  courses: String,
  contact: String,
});

const Professor = mongoose.model("Professor", professorSchema);

// Routes
app.get("/professors", async (req, res) => {
  const profs = await Professor.find();
  res.json(profs);
});

app.post("/professors", async (req, res) => {
  const newProf = new Professor(req.body);
  await newProf.save();
  res.json(newProf);
});

app.get("/professors/search/:name", async (req, res) => {
  const prof = await Professor.findOne({ name: req.params.name });
  res.json(prof);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
