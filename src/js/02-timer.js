import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refInputDataTime = document.querySelector('#datetime-picker');
const refBtnStart = document.querySelector('button[data-start]')
const refValueDaysTimer = document.querySelector('span[data-days]')
const refValueHoursTimer = document.querySelector('span[data-hours]')
const refValueMinutesTimer = document.querySelector('span[data-minutes]')
const refValueSecondsTimer = document.querySelector('span[data-seconds]')


let intervalId = null;

refBtnStart.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (!((selectedDates[0] - Date.now()) > 0)) {
      Notify.failure("Please choose a date in the future");
      
    } else {
      refBtnStart.removeAttribute("disabled");
      refBtnStart.addEventListener('click', startTimer);

      function startTimer() {
        refBtnStart.setAttribute("disabled", true);
        intervalId = setInterval(() => {
          const { days, hours, minutes, seconds } = convertMs(selectedDates[0] - Date.now());

          refValueDaysTimer.textContent = addLeadingZero(days);
          refValueHoursTimer.textContent = addLeadingZero(hours);
          refValueMinutesTimer.textContent = addLeadingZero(minutes);
          refValueSecondsTimer.textContent = addLeadingZero(seconds);

        }, 1000)
        
      }
    }      
  },
};

flatpickr(refInputDataTime, options);

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
