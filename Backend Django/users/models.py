import motor.motor_asyncio

import os
from dotenv import load_dotenv
from pathlib import Path

class Users:
    def __init__(self):
        BASE_DIR = Path(__file__).resolve().parent.parent
        load_dotenv(dotenv_path=BASE_DIR / '.env')

        client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGO_URI"))
        db = client[os.getenv("MONGO_DB_NAME")]
        self.__collection = db["Users"]
    
    def getUsersCollection(self):
        return self.__collection
        
