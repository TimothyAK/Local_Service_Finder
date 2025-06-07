const UserAmenityRepository = require("../repository/UserAmenityRepository")

class UserAmenityService {
    static getUserAmenitiesByUserID = async (userid) => {
        try {
            const result = await UserAmenityRepository.getUserAmenitiesByUserID(userid)

            const userAmenities = result.map((userAmenity) => {
                return {
                    "_id": userAmenity["_id"].toString(),
                    "amenityid": userAmenity["amenityid"],
                    "amenityName": userAmenity["amenityName"],
                    "amenityLat": userAmenity["amenityLat"],
                    "amenityLon": userAmenity["amenityLon"],
                    "isVisitted": userAmenity["isVisitted"]
                }
            })

            return userAmenities
        } catch (err) {
            throw err
        }
    }

    static bulkSetUserAmenity = async (userid, newUserAmenityDocs) => {
        try {
            for(let doc of newUserAmenityDocs) {
                let newUserAmenityDoc = {}
                if(doc["isVisitted"] !== undefined && typeof doc["isVisitted"] === "boolean") {
                    newUserAmenityDoc["isVisitted"] = doc["isVisitted"]
                }
                if(doc["name"] !== undefined && typeof doc["name"] === "string") {
                    newUserAmenityDoc["amenityName"] = doc["name"]
                }
                if(doc["lat"] !== undefined && typeof doc["lat"] === "number") {
                    newUserAmenityDoc["amenityLat"] = doc ["lat"]
                }
                if(doc["lon"] !== undefined && typeof doc["lon"] === "number") {
                    newUserAmenityDoc["amenityLon"] = doc["lon"]
                }

                if(newUserAmenityDoc == {}) {
                    continue
                }

                const userAmenity = await UserAmenityRepository.getUserAmenitiesByUserIDnAmenityID(userid, doc["id"])

                if(userAmenity == {}) {
                    newUserAmenityDoc = {
                        "userid": userid,
                        "amenityid": doc["id"],
                        ...newUserAmenityDoc
                    }
                    await UserAmenityRepository.createUserAmenity(newUserAmenityDoc)
                    continue
                }

                await UserAmenityRepository.updateUserAmenity(userid, doc["id"], newUserAmenityDoc)
            }
        } catch (err) {
            throw err
        }
    }
}

module.exports = UserAmenityService