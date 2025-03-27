# ************************************************************
#  Name: Matthew Eagan & Sam Adams & Sam Norton & Liem Tran
#        & Brennan Khengadi & Chase Aidala
#  Project: ScEnE - E6 E-Waste Bins
#  File Description: A Python script that reads data from an
#                    Arduino module and sends it to MondoDB
#  Last Modified: Mar. 27, 2024
# ************************************************************

import serial.tools.list_ports as coms
import serial

print("Welcome to the E6 Interface!\n")

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
while (uPort == aPort):
    for port in range(0, len(portlist)):
        if (portlist[port].startswith("COM" + str(aPort))):
            uPort = "COM" + str(aPort)
            aPort = ""
            print("You have selected: " + uPort)
            break
        elif (portlist[port].startswith(str(aPort))):
            uPort = str(aPort)
            aPort = ""
            print("You have selected: " + uPort)
            break
    
    if (uPort == aPort):
        print("That is not a valid port!")
        aPort = input("\nSelect the port through which you would like to read from your system: ")

# Inititalize Serial Port functionality
print(uPort)
systemSerial.port = uPort
systemSerial.open()
print("Success!")

while True:
    if systemSerial.in_waiting:
        data = systemSerial.readline()
        print(data.decode('utf').rstrip("\n"))