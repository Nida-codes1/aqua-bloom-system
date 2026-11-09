const $ = (id) => document.getElementById(id);
let pumpOn = false;
let autoMode = true;
let language = "en";

const demo = { soil: 68, temp: 29, humidity: 64, tank: 82 };

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function updateDashboard() {
  $("soilValue").textContent = demo.soil;
  $("tempValue").textContent = demo.temp;
  $("humidityValue").textContent = demo.humidity;
  $("tankValue").textContent = demo.tank;
  $("soilMeter").style.width = `${demo.soil}%`;
  $("tankMeter").style.width = `${demo.tank}%`;

  const soilStatus = $("soilStatus");
  if (demo.soil < 40) {
    soilStatus.textContent = "LOW";
    soilStatus.className = "status status-warn";
    $("irrigationTitle").textContent = "Your soil needs water.";
    $("irrigationText").textContent = "Soil moisture is below the preferred range. Check tank availability and irrigate.";
  } else if (demo.soil > 70) {
    soilStatus.textContent = "HIGH";
    soilStatus.className = "status status-warn";
    $("irrigationTitle").textContent = "Soil is already moist.";
    $("irrigationText").textContent = "Avoid unnecessary watering. Continue monitoring the field.";
  } else {
    soilStatus.textContent = "GOOD";
    soilStatus.className = "status status-good";
    $("irrigationTitle").textContent = "Your soil is looking healthy.";
    $("irrigationText").textContent = "Moisture is within the preferred range. Irrigation is not required right now.";
  }

  const tempStatus = $("tempStatus");
  if (demo.temp > 35) {
    tempStatus.textContent = "HIGH";
    tempStatus.className = "status status-warn";
  } else {
    tempStatus.textContent = "NORMAL";
    tempStatus.className = "status status-good";
  }

  const tankStatus = $("tankStatus");
  tankStatus.textContent = demo.tank < 20 ? "LOW LEVEL" : "AVAILABLE";
  tankStatus.className = demo.tank < 20 ? "status status-warn" : "status status-good";
  $("lastUpdated").textContent = `Updated ${new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}`;
  renderAlerts();
}

function renderAlerts() {
  const alerts = [];
  if (demo.soil < 40) alerts.push(["amber", "Soil moisture is low", "The field may need irrigation soon."]);
  if (demo.temp > 35) alerts.push(["amber", "High temperature detected", "Temperature is above 35°C. Monitor crop stress."]);
  if (demo.tank < 20) alerts.push(["amber", "Water tank level is low", "Refill the tank before starting irrigation."]);
  if (!alerts.length) alerts.push(["green", "Conditions look stable", "Current field readings are within the preferred range."]);
  $("alertCount").textContent = `${alerts.length} update${alerts.length > 1 ? "s" : ""}`;
  $("alertList").innerHTML = alerts.map(([type, title, message]) =>
    `<div class="alert-item"><span class="alert-symbol ${type}">${type === "green" ? "✓" : "!"}</span><div><strong>${title}</strong><p>${message}</p><small>Just now · Demo reading</small></div></div>`
  ).join("");
}

function setPump(value) {
  if (value && demo.tank < 10) {
    showToast("Tank level too low. Refill before irrigation.");
    pumpOn = false;
  } else {
    pumpOn = value;
    showToast(pumpOn ? "Demo pump switched ON" : "Demo pump switched OFF");
  }
  $("pumpStatus").textContent = pumpOn ? "PUMP ON" : "PUMP OFF";
  $("pumpStatus").className = pumpOn ? "status status-warn" : "status status-good";
  $("pumpBtn").textContent = pumpOn ? "Turn pump OFF" : "Turn pump ON";
  $("pumpBtn").style.background = pumpOn ? "#b87943" : "";
}

$("pumpBtn").addEventListener("click", () => setPump(!pumpOn));
$("autoToggle").addEventListener("change", (event) => {
  autoMode = event.target.checked;
  showToast(autoMode ? "Automatic guidance enabled" : "Automatic guidance paused");
});
$("refreshBtn").addEventListener("click", () => {
  // Small simulated variation to demonstrate a refreshing dashboard.
  demo.soil = Math.max(20, Math.min(90, demo.soil + Math.round(Math.random() * 6 - 3)));
  demo.temp = Math.max(22, Math.min(40, demo.temp + Math.round(Math.random() * 2 - 1)));
  demo.humidity = Math.max(35, Math.min(90, demo.humidity + Math.round(Math.random() * 6 - 3)));
  demo.tank = Math.max(5, Math.min(100, demo.tank - (pumpOn ? 2 : 0)));
  updateDashboard();
  showToast("Demo sensor readings refreshed");
});
$("languageBtn").addEventListener("click", () => {
  language = language === "en" ? "kn" : "en";
  $("languageBtn").textContent = language === "en" ? "ಕನ್ನಡ / EN" : "EN / ಕನ್ನಡ";
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = language === "en" ? el.dataset.en : el.dataset.kn;
  });
  showToast(language === "en" ? "English selected" : "ಕನ್ನಡ ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ");
});
$("menuBtn").addEventListener("click", () => $("sidebar").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => $("sidebar").classList.remove("open")));

const now = new Date();
$("todayDate").textContent = now.toLocaleDateString("en-IN", {day:"2-digit", month:"short", year:"numeric"});
updateDashboard();
