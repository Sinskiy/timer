let countdown;
let savedSeconds;
const buttons = document.querySelectorAll("button[data-time]");
const time = document.querySelector("h1");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const restart = document.querySelector(".restart");
const inputs = document.querySelectorAll("input");
const firstInput = document.querySelector(".firstInput");
const secondInput = document.querySelector(".secondInput");

function timer(seconds) {
  clearInterval(countdown);
  savedSeconds = seconds;

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  firstInput.value = `${minutes < 10 ? "0" : ""}${minutes}`;
  secondInput.value = `${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
}

function startTimer() {
  const minutes = parseFloat(firstInput.value) * 60;
  const seconds = parseFloat(secondInput.value);
  const thisTime = minutes + seconds;
  if (thisTime > 0) {
    timer(thisTime);
    start.dataset.activity = "nah";
    pause.dataset.activity = "yep";
    restart.dataset.activity = "yep";
  }
}

function pauseTimer() {
  if (pause.dataset.activity === "yep") {
    clearInterval(countdown);
    const minutes = parseFloat(firstInput.value) * 60;
    const seconds = parseFloat(secondInput.value);
    const thisTime = minutes + seconds;
    const secondsLeft = thisTime;
    displayTimeLeft(secondsLeft);
    start.dataset.activity = "yep";
    pause.dataset.activity = "nah";
    restart.dataset.activity = "yep";
  }
}

function resetTimer() {
  const minutes = parseFloat(firstInput.value) * 60;
  const seconds = parseFloat(secondInput.value);
  const thisTime = minutes + seconds;
  if (thisTime > 0) {
    timer(savedSeconds);
    start.dataset.activity = "nah";
    pause.dataset.activity = "yep";
    restart.dataset.activity = "yep";
  }
}

function setTimerPreset() {
  const seconds = this.dataset.time * 60;
  timer(seconds);
  start.dataset.activity = "nah";
  pause.dataset.activity = "yep";
  restart.dataset.activity = "yep";
}

function inputTime(e) {
  if (
    firstInput.value.length === 2 &&
    secondInput.value.length === 2 &&
    firstInput.value.match(/\d/g) !== 0 &&
    secondInput.value.match(/\d/g).length !== 0
  ) {
    start.dataset.activity = "yep";
    pause.dataset.activity = "nah";
    restart.dataset.activity = "nah";
  } else {
    start.dataset.activity = "nah";
    pause.dataset.activity = "nah";
    restart.dataset.activity = "nah";
  }
}

buttons.forEach((button) => button.addEventListener("click", setTimerPreset));
inputs.forEach((input) => input.addEventListener("input", inputTime));
