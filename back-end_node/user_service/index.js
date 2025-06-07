require("dotenv").config();
const express = require("express");
const connectDB = require("./db");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/users", require("./routes/auth"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
