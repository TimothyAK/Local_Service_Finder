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
        
    async def verifyUser(self, userCredentials):
        try:
            user = await self.__user_repository.get_user_by_email(userCredentials["email"])
            if user == None:
                raise Exception("User not found")
            
            pwdValid = bcrypt.checkpw(
                password = userCredentials["password"].encode("utf-8"),
                hashed_password = user["password"].encode("utf-8")
            )
            if not pwdValid:
                raise Exception("Invalid password")
            
            return user["_id"]
        except Exception as e:
            raise e
        
    async def resetPassword(self, email, newPassword):
        try:
            user = await self.__user_repository.get_user_by_email(email)
            if user == None:
                raise Exception("User not found")

            newPasswordBytes = newPassword.encode('utf-8')
            salt = bcrypt.gensalt(rounds=12)
            hash = bcrypt.hashpw(newPasswordBytes, salt)

            newPassword = hash.decode('utf-8')
            
            self.__user_repository.update_user_by_email(email, newPassword)
        except Exception as e:
            raise e