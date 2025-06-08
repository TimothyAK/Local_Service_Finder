from django.conf import settings
import os

class UserAmenities:
    def __init__(self):
        db = settings.MONGO_CLIENT[os.getenv("MONGO_DB_NAME")]
        self.__collection = db["UserAmenities"]
    
    def getUserAmenitiesCollection(self):
        return self.__collection
        
