<div align="center">

# Smart Library IoT Capacity Monitoring System

A real-time IoT-based library occupancy monitoring system using ESP8266, RFID/NFC, Firebase Realtime Database, LCD display, Blynk, and a web dashboard.

![IoT](https://img.shields.io/badge/IoT-Project-2563eb?style=for-the-badge)
![ESP8266](https://img.shields.io/badge/NodeMCU-ESP8266-16a34a?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-Realtime%20Database-f59e0b?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-22c55e?style=for-the-badge)

</div>

---

## Overview

Smart Library IoT Capacity Monitoring System is an IoT prototype designed to monitor library occupancy in real time.

The project was developed to solve a real campus problem. During exam periods, students often go to the library without knowing whether there are available seats. This system allows students to check the current library capacity remotely before going there.

The system uses RFID/NFC cards for student entry and exit tracking. The NodeMCU ESP8266 processes card data and sends real-time updates to Firebase Realtime Database. The data is then displayed through a modern web dashboard, student panel, LCD display, and Blynk mobile dashboard.

---

## Key Features

- Real-time capacity monitoring
- RFID/NFC-based student identification
- Firebase Realtime Database integration
- Web dashboard with live capacity chart
- Student-specific status panel
- Exit reminder system
- LCD entrance display
- Buzzer feedback for system events
- Blynk IoT mobile monitoring
- Modern landing page for portfolio presentation

---

## Problem Statement

University libraries can become highly crowded during exam weeks. Students may spend time travelling to the library only to find that there are no available seats.

This creates several problems:

- Time loss
- Inefficient use of study time
- Overcrowding
- Lack of remote availability information
- Poor space management

This project provides a real-time solution that helps students check library availability before arriving.

---

## System Architecture

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
| HTML | Web page structure |
| CSS | Web styling |
| JavaScript | Frontend logic and Firebase listener |
| Tailwind CSS | Landing page styling |
| Chart.js | Live capacity chart |

---

## Web Pages

### Landing Page

A modern portfolio-style page that introduces the project, including:

- Project overview
- Concept sketch
- Final 3D layout
- System architecture
- Features
- Hardware components
- Demo links

### Dashboard Page

The dashboard displays:

- Current library capacity
- Library status
- Real-time capacity chart
- Firebase synchronized updates

### Student Panel

Each student can access a personalized panel using their UID.

Example:

```txt
student.html?uid=43-44-84-2D
```

The student panel displays:

- Student name
- Inside / outside status
- Exit reminder warning
- Exit confirmation button

---

## RFID/NFC Card Logic

Each card has a unique UID. The system checks whether the scanned UID is registered as an authorized card.

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

The updated capacity is sent to Firebase and displayed in real time on the web dashboard.

---

## LCD Display

The LCD display is used as an entrance information screen.

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

---

## Buzzer Feedback

The buzzer provides physical feedback for system events.

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

## Firebase Realtime Database Structure

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

---

## Project Structure

```txt
smart-library-iot/
│
├── landing.html
├── index.html
├── student.html
│
├── css/
│   └── landing.css
│
├── js/
│   └── landing.js
│
├── assets/
│   ├── concept-sketch.png
│   └── smart-library-3d-render.png
│
└── README.md
```

---

## How to Run

Clone the repository:

```bash
git clone https://github.com/your-username/smart-library-iot.git
```

Open the project folder:

```bash
cd smart-library-iot
```

Open the landing page:

```txt
landing.html
```

You can also use the Live Server extension in Visual Studio Code.

---

## Prototype Assumption

This prototype does not use a sensor on every table.

Instead, it assumes that every student who enters the library will occupy one seat. Capacity is calculated based on RFID/NFC entry and exit events.

This assumption was made to keep the prototype low-cost and suitable for demonstration.

---

## Why Firebase Realtime Database?

Firebase Realtime Database was selected because:

- It supports real-time data synchronization
- It is simple to integrate with web applications
- It works well for small IoT data structures
- It allows live dashboard updates without refreshing the page
- It is suitable for a real-time IoT monitoring prototype

This project is not a Big Data project. It is a real-time IoT monitoring system.

---

## Future Improvements

- Add table-level seat sensors
- Add multiple RFID readers for different entrances
- Store historical usage data
- Add crowded-hour prediction
- Add admin login system
- Improve Firebase security rules
- Add mobile notifications
- Integrate with university student ID cards
- Deploy the dashboard online
- Add analytics for library usage patterns

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

## Team Members

- Mutia Maharani Kusuma
- Alviola Permatasari
- Tariro Simbiso Zizhou

---

## Course Information

Sakarya University  
Faculty of Computer and Information Sciences  
Computer Engineering Department  
Course: Internet of Things and Applications

---

## Project Status

| Module | Status |
|---|---|
| RFID/NFC Reading | Completed |
| ESP8266 Wi-Fi Connection | Completed |
| Firebase Integration | Completed |
| Web Dashboard | Completed |
| Student Panel | Completed |
| LCD Display | Completed |
| Buzzer Feedback | Completed |
| Landing Page | Completed |

---

## License

This project was developed for educational purposes.

You may use and modify it for learning, academic, and portfolio purposes.