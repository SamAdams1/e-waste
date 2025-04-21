//Team E-Waste ultrasonic sensor 
//The purpose of this code is to take ultrasonic measurements and log
//the measurements into an array. Additionally, we will set a threshold
//to trigger the Arduino to illuminate an LED to indicate that 
//the sensor is reading a simulated "full" collection bin.

#include "HX711.h"

// Sensor Pins
const int trigPin1 = 11;
const int echoPin1 = 12;
const int trigPin2 = 10;
const int echoPin2 = 9;
const int trigPin3 = 8;
const int echoPin3 = 7;
const int trigPin4 = 6;
const int echoPin4 = 5;

// LED Pins
const int fullPin = 3;
const int warningPin = 4;

// Variables
float duration;
float distance;
const int numReadings = 20;
float distanceReadings[numReadings];
int readingIndex = 0;

void setup() {
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(trigPin3, OUTPUT);
  pinMode(echoPin3, INPUT);
  pinMode(trigPin4, OUTPUT);
  pinMode(echoPin4, INPUT);
  pinMode(fullPin, OUTPUT);
  pinMode(warningPin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  // Cycle through sensors using a for loop
  for (int i = 1; i <= 4; i++) {
    float distance = getUltrasonicDistance(i);

    if (distance != -1) {
      Serial.print("Sensor ");
      if (i == 1) {Serial.print("One: ");}
      else if (i == 2) {Serial.print("Two: ");}
      else if (i == 3) {Serial.print("Three: ");}
      else if (i == 4) {Serial.print("Four: ");}
      Serial.print(distance);
      Serial.println(" cm");

      // LED alert system
      if (distance <= 25 && distance > 10) {
        digitalWrite(warningPin, HIGH);
      } else {
        digitalWrite(warningPin, LOW);
      }

      if (distance <= 10) {
        digitalWrite(fullPin, HIGH);
      } else {
        digitalWrite(fullPin, LOW);
      }
    }
  }

  delay(2000); // Wait before next cycle
}

float getUltrasonicDistance(int sensorNumber) {
  int trigPin = 0;
  int echoPin = 0;

  // Pin selection using sensorNumber
  if (sensorNumber == 1) {
    trigPin = trigPin1;
    echoPin = echoPin1;
  } else if (sensorNumber == 2) {
    trigPin = trigPin2;
    echoPin = echoPin2;
  } else if (sensorNumber == 3) {
    trigPin = trigPin3;
    echoPin = echoPin3;
  } else if (sensorNumber == 4) {
    trigPin = trigPin4;
    echoPin = echoPin4;
  } else {
    Serial.println("Invalid sensor number.");
    return -1;
  }

  // Ultrasonic measurement
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);

  // Calculate distance using speed of sound
  distance = (duration * 0.0343) / 2;

  return distance;
}
