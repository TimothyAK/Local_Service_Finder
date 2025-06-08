require("dotenv").config();
const express = require("express");
const amenitiesRoutes = require("./routes/amenities");
const JWTMiddleware =  require("./middleware/JWTMiddlware")

const app = express();
app.use(express.json());
app.use(JWTMiddleware.verifyToken)

app.use("/api/amenities", amenitiesRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Amenity service running on port ${PORT}`));
