require("dotenv").config();
const express = require("express");
const cors = require("cors")
const JWTMiddleware = require("./middleware/JWTMiddlware")

const connectDB = require("./db");

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

connectDB();

app.use("/api/users", require("./routes/auth"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
