const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};