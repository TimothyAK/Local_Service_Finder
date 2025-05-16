import bcrypt
from .repository import UserRepository

class UserService:
    def __init__(self):
        self.__user_repository = UserRepository()

    async def registerUser(self, newUserData):
        try:
            existingUsers = await self.__user_repository.get_users()
            for user in existingUsers:
                if user["username"] == newUserData["username"]:
                    raise Exception("Username already exist")
                if user["email"] == newUserData["email"]:
                    raise Exception("Email already exist")

            passwordBytes = newUserData["password"].encode('utf-8')
            salt = bcrypt.gensalt(rounds=12)
            hash = bcrypt.hashpw(passwordBytes, salt)

            newUserData["password"] = hash.decode('utf-8')
            
            await self.__user_repository.create_user(newUserData)
        except Exception as e:
            raise e