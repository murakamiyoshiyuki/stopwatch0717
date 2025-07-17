document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('stopwatch-grid');
    const numStopwatches = 20;

    const createStopwatch = () => {
        // --- State for this instance ---
        let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let running = false;

        // --- Create DOM elements ---
        const stopwatchEl = document.createElement('div');
        stopwatchEl.className = 'stopwatch';

        const displayEl = document.createElement('div');
        displayEl.className = 'display';
        displayEl.textContent = '00:00.00';

        const buttonsEl = document.createElement('div');
        buttonsEl.className = 'buttons';

        const startStopBtn = document.createElement('button');
        startStopBtn.textContent = 'Start';

        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset';

        buttonsEl.appendChild(startStopBtn);
        buttonsEl.appendChild(resetBtn);
        stopwatchEl.appendChild(displayEl);
        stopwatchEl.appendChild(buttonsEl);

        // --- Functions for this instance ---
        const formatTime = (time) => {
            const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(2, '0');
            const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
            const centiseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
            return `${minutes}:${seconds}.${centiseconds}`;
        };

        const update = () => {
            const currentTime = Date.now();
            elapsedTime = currentTime - startTime;
            displayEl.textContent = formatTime(elapsedTime);
        };

        const start = () => {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(update, 10);
            running = true;
            startStopBtn.textContent = 'Stop';
        };

        const stop = () => {
            clearInterval(timerInterval);
            running = false;
            startStopBtn.textContent = 'Start';
        };

        const reset = () => {
            clearInterval(timerInterval);
            running = false;
            elapsedTime = 0;
            displayEl.textContent = '00:00.00';
            startStopBtn.textContent = 'Start';
        };

        // --- Attach event listeners ---
        startStopBtn.addEventListener('click', () => {
            running ? stop() : start();
        });
        resetBtn.addEventListener('click', reset);

        return stopwatchEl;
    };

    // --- Create and append all instances ---
    for (let i = 0; i < numStopwatches; i++) {
        grid.appendChild(createStopwatch());
    }
});