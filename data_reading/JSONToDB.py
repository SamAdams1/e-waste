# ************************************************************
#  Name: Matthew Eagan & Sam Adams & Sam Norton & Liem Tran
#        & Brennan Khengadi & Chase Aidala
#  Project: ScEnE - E-Bins by E6
#  File Description: A Python script that reads data from json
#                    files and uploads to MondoDB
#  Last Modified: April 16, 2024
# ************************************************************

import os, json, pymongo
from pymongo import MongoClient, InsertOne
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from dotenv import load_dotenv
from bson import ObjectId

print("Welcome to the E-Bin Database Interface!\n")

# Import MongoDB environment from .env
USERNAME = os.getenv("MONGO_USERNAME")
PASSWORD = os.getenv("MONGO_PASSWORD")

CONNECTION_STRING = f"mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.us5hu.mongodb.net/?retryWrites=true&w=majority"

# Initiate communications with bins collection
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.test # Select Database
collection = db.bins # Select Collection

jsonPath = os.path.join(os.getcwd() + "\\data_reading\\json")

# Read from each existing json file
for file in os.listdir(jsonPath):
    if file.endswith(".json"):
        filePath = os.path.join(jsonPath, file)

        with open(filePath, "r") as f:
            data = json.load(f)

            # Match json index with respective DB document
            binID = ObjectId(data.get("_id"))
            # Designate vaues to be updated
            upData = {
                "fullness": data.get("Distance"),
                "weight": data.get("Weight")
            }

            # Format MongoDB request and apply
            push = collection.update_one(
                {"_id": binID},
                {"$set": upData}
            )

            # Return operation status to user
            print(f"Updated document with id={binID}: matched {push.matched_count}, modified {push.modified_count}")