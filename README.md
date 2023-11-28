# TECHNOHACKS PROJECT 1 - Count_Down_Timer
## OVERVIEW : 
The Countdown Timer is a simple and customizable web application that allows users to set, start, stop, reset, and restart countdowns. Whether you need to manage your time during tasks, set reminders, or organize events, this timer provides a user-friendly solution.
## FEATURES :
* Set countdown time in minutes using the input field.
* Start, stop, reset, and restart **functionalities for flexible timer control**.
* **Responsive design** for a seamless user experience on various devices.
* Informative messages provide feedback on user actions and timer status.
* Can **TOGGLE** between light and dark theme for good user experience.
## SAMPLE CODE :
### index.html :
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
    <title>Countdown Timer</title>
  </head>
  <body>
    <div class="container">
      <div id="timer">00:00</div>
      <div class="input-container">
        <label for="timeInput">Set Time (in minutes): </label>
        <input type="number" id="timeInput" min="1" value="" />
        <button id="setBtn">Set</button>
      </div>
      <div class="button-container">
        <button id="startBtn">Start</button>
        <button id="stopBtn">Stop</button>
        <button id="resetBtn">Reset</button>
        <button id="restartBtn">Restart</button>
      </div>
      <button id="themeToggle" onclick="toggleTheme()"></button>
      <div id="message"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

### sytles.css:
```
body {
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  overflow: scroll;
  background-color: black;
}

.container {
  text-align: center;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-container label {
  font-size: 2vw; /* Adjust the size as needed */
  margin-right: 30px;
}

.input-container input {
  font-size: 2vw; /* Adjust the size as needed */
  padding: 10px;
  width: 200px; /* Adjust the width as needed */
}

.input-container button {
  font-size: 2vw; /* Adjust the size as needed */
  margin-left: 20px;
  padding: 15px;
  margin-left: 50px;
}

.button-container button {
  font-size: 2vw; /* Adjust the size as needed */
  margin: 20px;
  padding: 10px;
}

#timer {
  font-size: 7vw; /* Adjust the size as needed */
  margin-bottom: 20px;
  color: #0f0;
}

button {
  font-size: 1vw; /* Adjust the size as needed */
  margin: 5px;
  padding: 2px 16px;
  cursor: pointer;
  background-color: #0f0; /* Neon green */
  color: #000; /* Black text */
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 5px #0f0, 0 0 25px #0f0;
  transition: transform 0.3s ease-in-out;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 5px #0f0, 0 0 25px #0f0, 0 0 50px #0f0, 0 0 100px #0f0,
    0 0 200px #0f0;
}

label {
  font-size: 3vw; /* Adjust the size as needed */
  margin-right: 5px;
}

input {
  font-size: 1em;
  margin: 10px;
  padding: 8px;
  border: 2px solid #0f0; /* Neon green border */
  border-radius: 5px;
  background-color: #000; /* Black background */
  color: #0f0; /* Neon green text */
}

#message {
  font-size: 9vw; /* Adjust the size as needed */
  margin-top: 30px;
  color: rgb(156, 162, 156);
  display: none;
}

/* Add styles for the glowing and moving ghost-like theme toggle button */
#themeToggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(0, 255, 0); /* Neon  */
  position: fixed;
  top: 20px;
  left: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 10px rgb(0, 255, 0), 0 0 20px rgb(0, 255, 0),
    0 0 30px rgb(0, 255, 0);
  opacity: 0.7;
}
#themeToggle:hover {
  animation: ghosting 2s infinite;
  opacity: 1;
}
@keyframes ghosting {
  0%,
  100% {
    box-shadow: 0 0 10px rgb(0, 255, 0), 0 0 20px rgb(0, 255, 0),
      0 0 30px rgb(0, 255, 0);
    transform: translateY(0);
  }
  50% {
    box-shadow: 0 0 20px rgb(0, 255, 0), 0 0 30px rgb(0, 255, 0),
      0 0 40px rgb(0, 255, 0);
    transform: translateY(-4px);
  }
}
/* Hide the theme toggle button text */
#themeToggle span {
  display: none;
}
/* Add dark theme styles */
body.dark-theme {
  background-color: #000; /* Black background */
  color: #0f0; /* Neon green text */
}
/* Add light theme styles */
body.light-theme {
  background-color: #f3eeee; /* Black background */
  color: #0f0; /* Neon green text */
}
```
### script.js:
```
let timer;
let time = 0; // Initial time in seconds (0 minutes)
let countdownActive = false;

function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerHTML = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

function displayMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.display = "block";
}

function setTimer() {
  const userInput = parseInt(document.getElementById("timeInput").value);
  if (!isNaN(userInput) && userInput > 0) {
    time = userInput * 60; // Convert minutes to seconds
    updateTimer();
  } else {
    displayMessage("Enter valid number");
  }
}

function startTimer() {
  if (!countdownActive) {
    countdownActive = true;
    timer = setInterval(function () {
      time--;
      updateTimer();
      if (time <= 0) {
        clearInterval(timer);
        countdownActive = false;
        displayMessage("Time's up!");
      }
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  countdownActive = false;
}

function resetTimer() {
  stopTimer();
  document.getElementById("timeInput").value = 0; // Reset input field to default value
  time = 0; // Reset time to 0 minutes
  updateTimer();
  document.getElementById("message").style.display = "none";
}

function restartTimer() {
  stopTimer();
  startTimer();
}

// Event listeners for buttons
document.getElementById("setBtn").addEventListener("click", setTimer);
document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("stopBtn").addEventListener("click", stopTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);
document.getElementById("restartBtn").addEventListener("click", restartTimer);

// Initial timer display
updateTimer();

// Theme toggle function
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
}
// Set an initial theme (e.g., dark theme)
document.body.classList.add("dark-theme");
```
## WEBPAGE :

### DARK MODE :

 **BASIC OUTLINE :**
 
![2023-11-28](https://github.com/Mena-Rossini/count_down_timer/assets/102855266/358ffccd-7f1e-45ae-aed2-c3d6fb7647b7)

  
**WITH INPUTS :**

![2023-11-28 (1)](https://github.com/Mena-Rossini/count_down_timer/assets/102855266/59ba6fe6-8b23-4cc8-a7bc-2d4dcc7c9dea)

  
**TIME'S UP !! :**

![2023-11-28 (3)](https://github.com/Mena-Rossini/count_down_timer/assets/102855266/f8caba17-6ec6-4858-94f6-ffe25c24f9c3)


### WHITE MODE :

![2023-11-28 (4)](https://github.com/Mena-Rossini/count_down_timer/assets/102855266/64885e76-db3f-42f3-b9e9-1a6b30a9fd30)

  
## Contributions:
Contributions are welcome! If you find any issues or have suggestions for improvements, please [Open New Issue](https://github.com/Mena-Rossini/count_down_timer/issues/new) or submit a pull request. Thank you! 

