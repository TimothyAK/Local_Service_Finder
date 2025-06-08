require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const UserRouter = require("./router/UserAmenityRouter")
const connectDB = require("./db")

const PORT = process.env.PORT

const app = express()

app.use(express.json())

connectDB()

app.use("/api/user_amenities/", UserRouter)

app.listen(PORT, () => console.log("server running on port " + PORT))