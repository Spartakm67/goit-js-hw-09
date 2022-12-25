import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
btnStart.addEventListener('click', startTimer);
btnStart.disabled = true;

let currentDate;
let selectedDate;
let timer = {};
let deltaDates;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    onDateSelection();
  },
};

flatpickr("#datetime-picker", options);

const refs = {
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};

function onDateSelection() {
    currentDate = new Date();
    deltaDates = currentDate - selectedDate;

  if (deltaDates >= 0) {
    Notiflix.Notify.failure('Please choose a date in the future!');
    return;
   } else {
    Notiflix.Notify.success('Ok, please click "Start" to countdown has started!');
    btnStart.disabled = false;
    return;
  }
};

function startTimer() { 
  const timerID = setInterval(() => {
    currentDate = new Date();
    deltaDates = selectedDate - currentDate;
    timer = convertMs(deltaDates);
    addLeadingZero(timer);
    btnStart.disabled = true;
    input.disabled = true;
    if (deltaDates < 1000) {
      timerStop(timerID);
    }
  }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
function addLeadingZero(timer) {
  const zeroTimer = {
    days: timer.days.toString().padStart(2, '0'),
    hours: timer.hours.toString().padStart(2, '0'),
    minutes: timer.minutes.toString().padStart(2, '0'),
    seconds: timer.seconds.toString().padStart(2, '0'),
  };
  pageTimerUpdates(zeroTimer, refs);
}

function pageTimerUpdates(zeroTimer, refs) {
  refs.daysTimer.textContent = zeroTimer.days;
  refs.hoursTimer.textContent = zeroTimer.hours;
  refs.minutesTimer.textContent = zeroTimer.minutes;
  refs.secondsTimer.textContent = zeroTimer.seconds;
}

function timerStop(timerID) {
  clearInterval(timerID);
  btnStart.disabled = false;
  input.disabled = false;
}

Notiflix.Notify.init({
  position: 'center-top', 
  width: '380px',
  distance: '30px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
});