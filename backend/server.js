const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");

const app = express();

app.use(cors({
  origin: "https://full-stack-notes-application-assignment.onrender.com",
}));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});