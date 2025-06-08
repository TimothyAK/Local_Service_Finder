require("dotenv").config();
const express = require("express");
const cors = require("cors")
const amenitiesRoutes = require("./routes/amenities");
const JWTMiddleware =  require("./middleware/JWTMiddlware")

const corsOptions = {
    origin: [
        'http://localhost:5173', 
        'http://localhost:8000', 
        'http://localhost:8001', 
        'http://localhost:8002',
        "localhost"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "accept",
        "authorization",
        "content-type",
        "user-agent",
        "x-csrftoken",
        "x-requested-with",
        "access-token"
    ]
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions))
app.use(JWTMiddleware.verifyToken)

app.use("/api/amenities", amenitiesRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Amenity service running on port ${PORT}`));
