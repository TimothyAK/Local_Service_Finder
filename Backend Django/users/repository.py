from .models import User
import json

class UserRepository:
    def create_user(username, email, password):
        user = User(
            username=username,
            email=email,
            password=password
        )

        user.save()

        return user.to_json()

    def get_users(email):
        users = User.objects.all()
        for user in users:
            print(user.to_json())
        return "Hello from repo"