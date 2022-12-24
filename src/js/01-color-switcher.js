const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColorValue = document.body;
let timerID = null;

btnStart.addEventListener('click', bodyChangeColor);
btnStop.addEventListener('click', stopBodyChangeColor);
btnStop.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

 
function bodyChangeColor() {
  
    timerID = setInterval(() => {
        const randomColor = getRandomHexColor();
        bodyColorValue.style.backgroundColor = randomColor;
    }, 1000);

    btnStart.disabled = true;
    btnStop.disabled = false;
};

function stopBodyChangeColor() {
    clearInterval(timerID);

    btnStart.disabled = false;
    btnStop.disabled = true;
};

