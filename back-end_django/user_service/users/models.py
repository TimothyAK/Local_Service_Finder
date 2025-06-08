from django.conf import settings
import os

class Users:
    def __init__(self):
        db = settings.MONGO_CLIENT[os.getenv("MONGO_DB_NAME")]
        self.__collection = db["Users"]
    
    def getUsersCollection(self):
        return self.__collection
        
