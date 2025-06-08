const UserAmenities = require("../model/UserAmenity")

class UserAmenityRepository {
    static getUserAmenitiesByUserID = async (userid) => {
        const userAmenities = await UserAmenities.find({
            "userid": userid
        })
        return userAmenities
    }

    static getUserAmenitiesByUserIDnAmenityID = async (userid, amenityid) => {
        const userAmenity = await UserAmenities.findOne({
            "userid": userid,
            "amenityid": amenityid
        })
        return userAmenity
    }

    static createUserAmenity = async (newUserAmenityDoc) => {
        await UserAmenities.insertOne(newUserAmenityDoc)
    }

    static updateUserAmenity = async (userid, amenityid, newUserAmenityDoc) => {
        await UserAmenities.updateOne(
            {
                "userid": userid,
                "amenityid": amenityid
            }, {
                "$set": newUserAmenityDoc
            }
        )
    }
}

module.exports = UserAmenityRepository