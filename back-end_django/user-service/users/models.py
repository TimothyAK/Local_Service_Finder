from pymongo import AsyncMongoClient
import os

class Users:
    def __init__(self):
        client = AsyncMongoClient(os.getenv("MONGO_URI"))
        db = client[os.getenv("MONGO_DB_NAME")]
        self.__collection = db["Users"]
    
    def getUsersCollection(self):
        return self.__collection
        
