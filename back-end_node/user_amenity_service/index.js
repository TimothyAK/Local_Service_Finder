require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const UserRouter = require("./router/UserAmenityRouter")

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

mongoose.connect(MONGO_URI)

mongoose.connection.once("open", () => {
    const app = express()

    app.use(express.json())

    app.use("/api/user_amenities/", UserRouter)

    app.listen(PORT, () => console.log("server running on port " + PORT))
})