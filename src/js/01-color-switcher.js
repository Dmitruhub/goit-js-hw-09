const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const button = document.querySelectorAll('button');
const body = document.querySelector('body');
let intervalId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', evt => {
  intervalId = setInterval(() => {
    // document.body.setAttribute(
    //   'style',
    // 'background-color : '
    body.style.backgroundColor = getRandomHexColor();
    // );
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
});
stopBtn.addEventListener('click', evt => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
