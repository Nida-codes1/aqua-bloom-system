# 🌱 Aqua Bloom System

A responsive smart-irrigation and tomato-farming dashboard prototype.

## About
Aqua Bloom is a student engineering project concept that helps monitor tomato-field conditions and support irrigation decisions using sensor readings.

🔗 **Live Website:** https://nida-codes1.github.io/aqua-bloom-system/
## Dashboard features
- Soil moisture, temperature, humidity and water-tank indicators
- Irrigation status and demo pump control
- Automatic-guidance toggle
- Field alerts based on moisture, temperature and tank thresholds
- Responsive layout for desktop and mobile
- English/Kannada interface toggle

## Important: demo mode
This repository currently contains a **front-end demonstration**. Sensor values are simulated in `script.js`; the pump button changes only the dashboard state. It does not communicate with an ESP32 or switch a physical pump.

To connect the actual hardware, replace the demo values with readings from your ESP32 communication layer and add suitable safety checks before controlling a relay.

## Project structure
```text
aqua-bloom-system/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## Built with
HTML · CSS · JavaScript
