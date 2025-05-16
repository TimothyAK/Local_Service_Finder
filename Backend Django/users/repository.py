from .models import Users
import json

class UserRepository:
    def __init__(self):
        self.__Users = Users().getUsersCollection()

    async def create_user(self, newUserDoc):
        user = await self.__Users.insert_one(newUserDoc)

        return user.to_json()

    async def get_users(self):
        cursor = self.__Users.find({})
        users = [user async for user in cursor]
        return users