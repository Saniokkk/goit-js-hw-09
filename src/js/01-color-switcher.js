
const refBtnStart = document.querySelector('button[data-start]');
const refBtnStop = document.querySelector('button[data-stop]');
const refBody = document.querySelector('body')
let intervalId = null;

refBtnStart.style.width = '100px';
refBtnStart.style.height = '60px';
refBtnStop.style.width = '100px';
refBtnStop.style.height = '60px';

refBtnStart.addEventListener('click', onClickBtnStart);
refBtnStop.addEventListener('click', onClickBtnStop);
refBtnStop.setAttribute("disabled", true);

function bodyBackgroundColor() {
    refBody.style.backgroundColor = `${getRandomHexColor()}`
}

function onClickBtnStart() {
    refBtnStart.setAttribute("disabled", true);
    refBtnStop.removeAttribute("disabled");
    intervalId = setInterval(bodyBackgroundColor, 1000);
}
function onClickBtnStop() {
    refBtnStop.setAttribute("disabled", true);
    refBtnStart.removeAttribute("disabled");
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}