import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
btnStart.addEventListener('click', timeStart);
btnStart.disabled = true;

let selectedDate;
let datesDiffer;
let timer = {};
let currentDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const refs = {
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     selectedDate = selectedDates[0];
//     choiseDate();
//   },
// };

flatpickr("#datetime-picker", options);



function timeStart() { };
