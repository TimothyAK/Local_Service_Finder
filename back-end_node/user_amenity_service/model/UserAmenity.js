const mongoose = require("mongoose");

const userAmenitySchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    amenityid: { type: Number, required: true },
    amenityName: { type: String, required: true },
    isVisitted: { type: Boolean, required: true },
    amenityLat: { type: Number, required: true },
    amenityLon: { type: Number, required: true }
});

module.exports = mongoose.model("UserAmenity", userAmenitySchema, "UserAmenities");