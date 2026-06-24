const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const questionRoutes = require("./routes/questionRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/questions", questionRoutes);

app.get('/', (req, res) => {
    res.send("Server Working...");
});

const PORT = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    res.send("Test Route Working");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});