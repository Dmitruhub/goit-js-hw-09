import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

startBtn.addEventListener('click', onClick);

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (userDate < Date.now()) {
      Notiflix.Report.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

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
}
function countingTime({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onClick() {
  startBtn.disabled = true;

  setInterval(() => {
    // timeNow = date.getTime();
    if (userDate - Date.now() < 0) return;

    countingTime(convertMs(userDate - Date.now()));
  }, 1000);
}
// // const timer1 = {
// //   start() {
// //     const startTime = Date.now();
// //     setInterval(() => {
// //       const currentTime = Date.now();
// //       const deltaTime = currentTime - startTime;
// //       const { days, hours, minutes, seconds } = convertMs(deltaTime);
// //       console.log(`${days}:${hours}:${minutes}:${seconds}`);
// //     }, 1000);
// //   },
// // };
// timer1.start();
