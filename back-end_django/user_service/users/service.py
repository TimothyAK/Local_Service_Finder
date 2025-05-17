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
                    raise Exception("Email already exist", 400)

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
                raise Exception("User not found", 404)
            
            pwdValid = bcrypt.checkpw(
                password = userCredentials["password"].encode("utf-8"),
                hashed_password = user["password"].encode("utf-8")
            )
            if not pwdValid:
                raise Exception("Invalid password", 400)
            
            return user["_id"]
        except Exception as e:
            raise e
        
    async def resetPassword(self, resetPasswordData):
        try:
            user = await self.__user_repository.get_user_by_email(resetPasswordData["email"])
            if user == None:
                raise Exception("User not found", 404)
            
            pwdValid = bcrypt.checkpw(
                password = resetPasswordData["password"].encode("utf-8"),
                hashed_password = user["password"].encode("utf-8")
            )
            if not pwdValid:
                raise Exception("Invalid password", 400)

            newPasswordBytes = resetPasswordData['newPassword'].encode('utf-8')
            salt = bcrypt.gensalt(rounds=12)
            hash = bcrypt.hashpw(newPasswordBytes, salt)

            resetPasswordData['newPassword'] = hash.decode('utf-8')
            
            await self.__user_repository.update_user_by_email(resetPasswordData["email"], resetPasswordData['newPassword'])
        except Exception as e:
            raise e
        
    async def sendResetPasswordEmail(self, email):
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart

        sender_email = "debooker.emailservice@gmail.com"
        receiver_email = email
        password = "pqihxngqdqrczads"

        message = MIMEMultipart("alternative")
        message["Subject"] = "Reset Password Request"
        message["From"] = sender_email
        message["To"] = receiver_email

        try:
            with open("./htmls/email_content.html", "r", encoding="utf-8") as file:
                html_content = file.read()
                
            html_part = MIMEText(html_content, "html")
            message.attach(html_part)

            # Send the email using Gmail SMTP
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message.as_string())
        except Exception as e:
            raise e