<div align="center">

# · Smart Library · IoT ·
A real-time IoT prototype for monitoring library occupancy using ESP8266, RFID/NFC, Firebase Realtime Database, LCD display, Blynk, and a web dashboard.

[![IoT](https://img.shields.io/badge/IoT-Uni%20Project-16a34a?style=flat)](#)
[![ESP8266](https://img.shields.io/badge/NodeMCU-ESP8266-f59e0b?style=flat)](#)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime%20Database-2f2f2f?style=flat)](#)
[![RFID](https://img.shields.io/badge/Tag-RFID/NFC-2563eb?style=flat)](#)

<br>

[![Website](https://img.shields.io/badge/Website-IoT%20Smart%20Library-ff69b4?style=flat)](https://la-prmtsr.github.io/iot-smart-library/)

</div>

---

## Overview

Smart Library IoT Capacity Monitoring System is an IoT prototype designed to monitor library occupancy in real time.

The project was developed to solve a real campus problem. During exam periods, students often go to the library without knowing whether there are available seats. This system allows students to check the current library capacity remotely before going there.

The system uses RFID/NFC cards for student entry and exit tracking. The NodeMCU ESP8266 processes card data and sends real-time updates to Firebase Realtime Database. The updated data is displayed through a web dashboard, student panel, LCD display, and Blynk mobile dashboard.

---

## Problem Statement

University libraries can become highly crowded during exam weeks. Students may spend time travelling to the library only to find that there are no available seats.

This creates several problems:

- Time loss
- Inefficient use of study time
- Overcrowding
- Lack of remote availability information
- Poor space management

This project provides a real-time monitoring solution that helps students check library availability before arriving.

---

## Core System Flow

```txt
RFID / NFC Card
      ↓
MFRC522 RFID Reader
      ↓
NodeMCU ESP8266
      ↓
Firebase Realtime Database
      ↓
Web Dashboard / Student Panel / Blynk App
      ↓
LCD Display + Buzzer Feedback
```

---

## Key Features

- Real-time library capacity monitoring
- RFID/NFC-based student identification
- ESP8266 Wi-Fi communication
- Firebase Realtime Database synchronization
- Web dashboard with live capacity chart
- Student-specific status panel
- LCD entrance display
- Buzzer feedback for system events
- Exit reminder and manual exit confirmation
- Blynk IoT mobile monitoring

---

## System Components

The prototype is organized around the main IoT data flow: student identification, real-time capacity updates, cloud synchronization, and user-facing display.

| Component | Role in the System |
|---|---|
| RFID/NFC Cards | Identify students using unique card UIDs |
| MFRC522 RFID Reader | Reads the scanned card UID |
| NodeMCU ESP8266 | Processes entry/exit logic and sends updates through Wi-Fi |
| Firebase Realtime Database | Stores and synchronizes capacity and student status in real time |
| Web Dashboard | Displays live capacity, library status, and chart visualization |
| Student Panel | Shows student-specific inside/outside status and exit confirmation |
| LCD Display | Shows entrance capacity and availability status |
| Blynk App | Provides mobile monitoring for the IoT prototype |
| Buzzer | Gives physical feedback for entry, exit, warning, and error events |

---

## Technologies Used

### Hardware

| Component | Purpose |
|---|---|
| NodeMCU ESP8266 | Wi-Fi enabled microcontroller |
| MFRC522 RFID Reader | Reads RFID/NFC card UID |
| 16x2 I2C LCD Display | Displays capacity and status |
| RFID/NFC Cards | Student identification |
| Passive Buzzer | Audio feedback |
| Breadboard | Circuit prototyping |
| Jumper Wires | Hardware connections |

### Software

| Technology | Usage |
|---|---|
| Arduino IDE | Microcontroller programming |
| Firebase Realtime Database | Cloud-based real-time data storage |
| Blynk IoT | Mobile IoT monitoring |
| HTML | Web interface structure |
| CSS | Web interface styling |
| JavaScript | Firebase listener and frontend logic |
| Tailwind CSS | Landing page styling |
| Chart.js | Live capacity chart |

---

## RFID/NFC Card Logic

Each RFID/NFC card has a unique UID. The system checks whether the scanned UID belongs to a registered student.

Example UID mapping:

```txt
43-44-84-2D → Student 1
83-E5-B6-2C → Student 2
63-85-2A-11 → Student 3
39-92-FB-03 → Student 4
```

System behavior:

| Condition | Action |
|---|---|
| Authorized card and student is outside | Entry is registered |
| Authorized card and student is inside | Exit is registered |
| Unauthorized card | Access is denied |
| Capacity is full | Entry is not allowed |

---

## Capacity Logic

The prototype assumes that each student who enters the library occupies one seat.

Example:

```txt
Maximum capacity: 3
Initial available capacity: 3
```

When a student enters:

```txt
capacity = capacity - 1
```

When a student exits:

```txt
capacity = capacity + 1
```

The updated capacity is sent to Firebase and displayed in real time on the dashboard, LCD display, and Blynk app.

---

## Firebase Realtime Database

Firebase Realtime Database stores the current library capacity, system status, timestamp, and student entry/exit state.

Example database structure:

```json
{
  "kapasite": 3,
  "status": "AVAILABLE",
  "timestamp": 12345,
  "ogrenciler": {
    "43-44-84-2D": {
      "iceride": true,
      "girisZamani": 12345,
      "uyari": false
    },
    "83-E5-B6-2C": {
      "iceride": false,
      "girisZamani": 0,
      "uyari": false
    }
  }
}
```

Firebase was selected because it supports real-time synchronization and allows the dashboard to update without refreshing the page.

---

## Interface Layer

The system includes several output interfaces to make the real-time capacity data visible to users and administrators.

### Web Dashboard

The dashboard displays:

- Current library capacity
- Library availability status
- Real-time capacity chart
- Firebase-synchronized updates

### Student Panel

Each student can access a personalized panel using their RFID UID.

Example:

```txt
student.html?uid=43-44-84-2D
```

The student panel displays:

- Student name
- Inside / outside status
- Exit reminder warning
- Exit confirmation button

### LCD Display

The LCD display acts as an entrance information screen.

Example output when seats are available:

```txt
Kapasite: 3
Status: AVAILABLE
```

Example output when the library is full:

```txt
Kapasite: 0
Status: FULL
```

### Blynk Mobile Dashboard

Blynk is used as a mobile monitoring interface for checking the prototype status from a phone.

---

## Buzzer Feedback

The buzzer provides physical feedback for different system events.

| Event | Feedback |
|---|---|
| Authorized entry | Entry sound |
| Authorized exit | Exit sound |
| Unauthorized card | Error sound |
| Full capacity | Warning sound |

---

## Exit Reminder System

If a student enters the library but forgets to scan their card while leaving, the system can trigger a warning.

For demonstration purposes, the waiting duration is simulated using a short time such as 5 or 10 seconds.

The student can confirm exit from the student panel. After confirmation, Firebase updates the student status and the capacity is corrected.

---

## Prototype Assumption

This prototype does not use a sensor on every table.

Instead, it assumes that every student who enters the library will occupy one seat. Capacity is calculated based on RFID/NFC entry and exit events.

This assumption was made to keep the prototype low-cost and suitable for demonstration.

---

## Repository Contents

```txt
iot-smart-library/
│
├── landing.html        # Project introduction and demo page
├── index.html          # Real-time capacity dashboard
├── student.html        # Student status and exit confirmation panel
│
├── css/                # Interface styling
├── js/                 # Firebase listener and dashboard logic
├── assets/             # Project visuals and prototype images
│
└── README.md
```

---

## How to Run

Clone the repository:

```bash
git clone https://github.com/la-prmtsr/iot-smart-library.git
```

Open the project folder:

```bash
cd iot-smart-library
```

Open the landing page:

```txt
landing.html
```

You can also use the Live Server extension in Visual Studio Code.

---

## Security Note

Sensitive information such as Wi-Fi passwords, Firebase database secrets, and Blynk authentication tokens should not be uploaded publicly.

Recommended structure:

```txt
arduino/
├── main.ino
└── config.example.h
```

Example configuration file:

```cpp
#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASS "YOUR_WIFI_PASSWORD"
#define FIREBASE_AUTH "YOUR_FIREBASE_SECRET"
#define BLYNK_AUTH "YOUR_BLYNK_TOKEN"
```

Add real credential files to `.gitignore`.

---

## Future Improvements

- Add table-level seat sensors
- Add multiple RFID readers for different entrances
- Store historical usage data
- Add crowded-hour prediction
- Improve Firebase security rules
- Add mobile notifications
- Integrate with university student ID cards
- Add analytics for library usage patterns

---

## Team Members

- Mutia Maharani Kusuma
- Alviola Permatasari
- Tariro Simbiso Zizhou

---

## Course Information

Course: Internet of Things and Applications

Computer Engineering Department  

Sakarya University · Faculty of Computer and Information Sciences  

---

## License

This project was developed for educational purposes.
