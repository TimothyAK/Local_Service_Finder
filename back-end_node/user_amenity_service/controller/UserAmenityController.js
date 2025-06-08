const UserAmenityService = require("../service/UserAmenityService")

class UserAmenityController {
    static getUserAmenitiesByUserID = async (req, res) => {
        const jwtPayload = req.jwtPayload 
        try {
            const userAmenities = await UserAmenityService.getUserAmenitiesByUserID(jwtPayload["userid"])

            res.json({
                "data": userAmenities
            })
            return res.status(200).end()
        } catch (err) {
            console.log(err)
            return res.status(500).end("Internal server error")
        }
    }

    static bulkUpdateUserAmenities = async (req, res) => {
        const jwtPayload = req.jwtPayload
        const reqBody = req.body
        if(!Array.isArray(reqBody["list"])) {
            return res.status(400).end("Invalid request body")
        }

        try {
            await UserAmenityService.bulkSetUserAmenity(jwtPayload["userid"], reqBody["list"])
            
            res.send({
                "message": "User amenities have been updated"
            })
            return res.status(200).end()
        } catch (err) {
            return res.status(200).end("Internal server error")
        }
    }
}

module.exports = UserAmenityController