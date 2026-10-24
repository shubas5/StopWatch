const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapList = document.getElementById("lapList");
const lapCount = document.getElementById("lapCount");

let startTime = 0;
let elapsedTime = 0;
let timer = null;

let laps = 0;
const maxLaps = 5;
function updateDisplay() {
    const totalTime = elapsedTime;
    const hours = Math.floor(totalTime / 3600000);
    const minutes = Math.floor(
        (totalTime % 3600000) / 60000
    );
    const seconds = Math.floor(
        (totalTime % 60000) / 1000
    );
    const milliseconds = Math.floor(
        (totalTime % 1000) / 10
    );

    display.textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0");
}
startBtn.addEventListener("click", function () {

    if (timer !== null) {
        return;
    }
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);

});
pauseBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
});
resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    startTime = 0;
    elapsedTime = 0;
    laps = 0;
    updateDisplay();
    lapList.innerHTML = "";
    lapCount.textContent = "Laps: 0 / 5";

});

lapBtn.addEventListener("click", function () {

    if (laps >= maxLaps) {
        alert("Reached Limit! You can only record 5 laps.");
        return;
    }
    if (timer === null && elapsedTime === 0) {
        alert("Please start the stopwatch first!");
        return;
    }

    laps++;
    const li = document.createElement("li");
    const lapName = document.createElement("span");
    lapName.textContent = "Lap " + laps;
    const lapTime = document.createElement("span");
    lapTime.textContent = display.textContent;
    li.appendChild(lapName);
    li.appendChild(lapTime);

    lapList.appendChild(li);
    lapCount.textContent = "Laps: " + laps + " / " + maxLaps;
    if (laps === maxLaps) {
        alert("Reached Limit! You have recorded 5 laps.");

    }

});