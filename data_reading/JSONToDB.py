# ************************************************************
#  Name: Matthew Eagan & Sam Adams & Sam Norton & Liem Tran
#        & Brennan Khengadi & Chase Aidala
#  Project: ScEnE - E-Bins by E6
#  File Description: A Python script that reads data from json
#                    files and uploads to MondoDB
#  Last Modified: April 8, 2024
# ************************************************************

import os, json, pymongo
from pymongo import MongoClient, InsertOne

print("Welcome to the E-Bin Database Interface!\n")