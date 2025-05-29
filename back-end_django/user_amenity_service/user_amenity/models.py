from pymongo import AsyncMongoClient
import os

class UserAmenities:
    def __init__(self):
        client = AsyncMongoClient(os.getenv("MONGO_URI"))
        db = client[os.getenv("MONGO_DB_NAME")]
        self.__collection = db["UserAmenities"]
    
    def getUserAmenitiesCollection(self):
        return self.__collection
        
