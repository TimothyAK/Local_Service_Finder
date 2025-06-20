from .models import Users

class UserRepository:
    def __init__(self):
        self.__Users = Users().getUsersCollection()

    async def create_user(self, newUserDoc):
        await self.__Users.insert_one(newUserDoc)

    async def get_users(self):
        cursor = self.__Users.find({})
        users = [user async for user in cursor]
        return users
    
    async def get_user_by_email(self, email):
        user = await self.__Users.find_one({
            "email": email
        })
        return user
    
    async def update_user_by_email(self, email, newPassword):
        result = await self.__Users.update_one({
            "email": email
        }, {
            "$set": {
                "password": newPassword
            }
        })
        return result.modified_count
    
    async def delete_user_by_email(self, email):
        result = await self.__Users.delete_one({
            "email": email
        })
        return result.deleted_count