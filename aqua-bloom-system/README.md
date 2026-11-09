# 🌱 Aqua Bloom System

A responsive smart-irrigation and tomato-farming dashboard prototype.

## About
Aqua Bloom is a student engineering project concept that helps monitor tomato-field conditions and support irrigation decisions using sensor readings.

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

## Run locally
No build tools are required for this starter version.

1. Download or clone this repository.
2. Open the folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.

## Publish with GitHub Pages
1. Push the project files to a GitHub repository.
2. Open the repository on GitHub.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`.
6. Click **Save**. Wait for the Pages URL to appear.

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
