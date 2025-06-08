require("dotenv").config()
const express = require("express")
const cors = require("cors")
const UserRouter = require("./router/UserAmenityRouter")
const connectDB = require("./db")

const PORT = process.env.PORT

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

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

connectDB()

app.use("/api/user_amenities/", UserRouter)

app.listen(PORT, () => console.log("server running on port " + PORT))