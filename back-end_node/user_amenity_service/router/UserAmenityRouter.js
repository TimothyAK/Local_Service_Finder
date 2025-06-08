const express = require("express")
const UserAmenityController = require("../controller/UserAmenityController")
const JWTMiddleware = require("../middleware/JWTMiddlware")

const router = express.Router()

router.use(JWTMiddleware.verifyToken)
router.get("/", UserAmenityController.getUserAmenitiesByUserID)
router.post("/", UserAmenityController.bulkUpdateUserAmenities)

module.exports = router