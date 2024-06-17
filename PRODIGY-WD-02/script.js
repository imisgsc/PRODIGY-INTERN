let timer;
let elapsedTime = 0;
let running = false;
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function updateDisplay(time) {
    const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startStop() {
    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 1000);
        startStopBtn.textContent = 'Pause';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    updateDisplay(elapsedTime);
    startStopBtn.textContent = 'Start';
    laps.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.textContent = display.textContent;
        laps.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
