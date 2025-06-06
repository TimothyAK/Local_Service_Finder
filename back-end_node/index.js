require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const amenitiesRoutes = require("./routes/amenities");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/services", require("./routes/serviceSearch"));
app.use("/api/amenities", amenitiesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
