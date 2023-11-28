let timer;
let time = 0; // Initial time in seconds (5 minutes)
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
  time = 0; // Reset time to 5 minutes
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
