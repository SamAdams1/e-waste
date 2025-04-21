# ************************************************************
#  Name: Matthew Eagan & Sam Adams & Sam Norton & Liem Tran
#        & Brennan Khengadi & Chase Aidala
#  Project: ScEnE - E-Bins by E6
#  File Description: A Python script that reads data from an
#                    Arduino module and sends it to MondoDB
#  Last Modified: April 16, 2024
# ************************************************************

import serial.tools.list_ports as coms
import serial, re, os, json, pymongo
from pymongo import MongoClient, InsertOne
from dotenv import load_dotenv

print("Welcome to the E-Bin Serial Interface!\n")

# Import MongoDB environment from .env
USERNAME = os.getenv("MONGO_USERNAME")
PASSWORD = os.getenv("MONGO_PASSWORD")

CONNECTION_STRING = f"mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.us5hu.mongodb.net/?retryWrites=true&w=majority"

# Initiate communications with bins collection
client = pymongo.MongoClient(CONNECTION_STRING)
db = client.test # Select Database
collection = db.bins # Select Collection

# Pull bin documents from MongoDB
availableBins = list(collection.find({}))

# User identifies bin being monitored by this script
print("Enter the number of the bin you are monitoring below")
print("Available Bins:")

# Print each existing bin entry for a user to select from
for x, availableBin in enumerate(availableBins, 1):
    print("Bin #" + str(x) + ": " + f"{availableBin['name']} (ID: {availableBin['_id']})")

binNo = input("Bin #: ") # Designate the number of the bin to be easily understandable
binID = str(availableBins[(int(binNo))-1]['_id']) # Match selected bin with DB entry

jsonName = "data_reading\\json\\bin" + str(binNo) + ".json" 
file = os.path.join(os.getcwd(), jsonName)
# print(file)

binInfo = {
    "_id": "",
    "Distance": 0.0,
    "Weight" : 0.0
}

# Initialize System Serial
systemSerial = serial.Serial()
systemSerial.baudrate = 9600

# Identify COM ports on system
ports = coms.comports()
portlist = []

print("System ports: ")
for port in ports:
    portlist.append(str(port))
    print(str(port))

# Prompt user to select Arduino COM port
aPort = input("\nSelect the port through which you would like to read from your system: ")
uPort = aPort

#Validate the user entered a correct COM port
while (uPort == aPort): # Iterate through this section until a valid port is selected
    try:
        for port in range(0, len(portlist)):
            if (portlist[port].startswith("COM" + str(aPort))): # User identified port by COM number
                uPort = "COM" + str(aPort) # Reformat user entry to full name
                aPort = ""
                print("You have selected: " + uPort)
                break
            elif (portlist[port].startswith(str(aPort))): # User identified port by full name
                uPort = str(aPort)
                aPort = ""
                print("You have selected: " + uPort)
                break

        if (uPort == aPort): # User enters a nonexisting port
            print("That is not a valid port!")
            aPort = input("\nSelect the port through which you would like to read from your system: ")

        if (uPort != aPort): # Attempts to open the port for serial communications if a valid input is entered
            # Inititalize Serial Port functionality
            systemSerial.port = uPort
            systemSerial.open()
    
    except: # Prevents the script from crashing if the COM port is unavailable
        print("This port is unavailable!")
        aPort = input("\nSelect the port through which you would like to read from your system: ")
        uPort = aPort
print("Successfully reading from: " + uPort)

# Continuously read from the Arduino
while True:
    if systemSerial.in_waiting:
        readings = [0, 0, 0, 0, 0]

        for x in range(0,5):
            # Read the data sent by the Arduino and decode result into strings
            data = systemSerial.readline() 
            data = data.decode('utf').rstrip("\n")

            # Extract numeric values sent from the Arduino and save as a list
            match = re.search(r'\d+', data)
            if match:
                readings[x] = float(match.group())

        # Save the readings list as integer values
        sensor1, sensor2, sensor3, sensor4, sensor5 = readings

        # Display results
        print("Sensor 1: " + str(sensor1) + "cm")
        print("Sensor 2: " + str(sensor2) + "cm")
        print("Sensor 3: " + str(sensor3) + "cm")
        print("Sensor 4: " + str(sensor4) + "cm")
        print("Sensor 5: " + str(sensor5) + "kg")

        # Average distance modules to make data more interpretable
        avgDistance = ((sensor1 + sensor2 + sensor3 + sensor4)/4)

        print("Distance: " + str(avgDistance) + "cm")
        print("Weight: " + str(sensor5) + "kg")

        # Update Dictionary with recorded values
        binInfo["_id"] = binID
        binInfo["Distance"] = avgDistance * 0.393701
        binInfo["Weight"] = sensor5 * 2.20462

        # Write recorded values to respective json file
        with open(os.path.join(os.getcwd(), jsonName), 'w+') as file:
            json.dump(binInfo, file)