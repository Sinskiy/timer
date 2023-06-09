let countdown;
let savedSeconds;
let countFunctions;
const buttons = document.querySelectorAll("button[data-time]");
const time = document.querySelector("h1");
const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const restart = document.querySelector(".restart");
const inputs = document.querySelectorAll("input");
const firstInput = document.querySelector(".firstInput");
const secondInput = document.querySelector(".secondInput");
const toDeleteButton = document.querySelector(".deleteButton");

function timer(seconds) {
  clearInterval(countdown);
  savedSeconds = seconds;
  firstInput.setAttribute("readonly", "");
  secondInput.setAttribute("readonly", "");

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft === 0) {
      let audio = new Audio("./sources/alarm.mp3");
      audio.volume = 0.3;
      audio.play();
      start.dataset.activity = "nah";
      pause.dataset.activity = "nah";
      restart.dataset.activity = "nah";
    } else if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
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
  if (secondInput.value === "") seconds = 0;
  else seconds = parseFloat(secondInput.value);
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
    firstInput.removeAttribute("readonly");
    secondInput.removeAttribute("readonly");
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

function inputTime() {
  if (
    (secondInput.value.match(/\d/g)?.length === 2 &&
      secondInput.value.match(/\d/g).join("") !== "00") ||
    (firstInput.value.match(/\d/g)?.length === 2 &&
      firstInput.value.match(/\d/g).join("") !== "00")
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

function toDelete() {
  this.remove();
}

function handleEvent() {
  this.innerHTML = "❌";
}

function ifDeleteButtonClicked() {
  console.log("ifDeleteButtonClicked");
  if (!toDeleteButton.classList.contains("delete")) console.log("lmao");
  else {
    toDeleteButton.classList.remove("delete");
    toDeleteButton.removeEventListener("click", ifDeleteButtonClicked);
    buttons.forEach((button) => {
      button.removeEventListener("click", toDelete);
      button.removeEventListener(
        "mouseout",
        () => (button.innerHTML = button.dataset.time)
      );
      button.removeEventListener("mouseover", handleEvent);
      button.removeEventListener("click", setTimerPreset);
      button.classList.remove("delete");
    });
  }
}

function deleteButton() {
  console.log("deletButton");
  toDeleteButton.classList.add("delete");
  buttons.forEach((button) => {
    button.addEventListener("click", toDelete);
    button.addEventListener("mouseover", handleEvent);
    button.addEventListener(
      "mouseout",
      () => (button.innerHTML = button.dataset.time)
    );
    button.removeEventListener("click", setTimerPreset);
    button.classList.add("delete");
  });
  toDeleteButton.addEventListener("click", ifDeleteButtonClicked);
}

inputs.forEach((input) => input.addEventListener("input", inputTime));
inputs.forEach((input) => input.addEventListener("change", inputTime));
buttons.forEach((button) => button.addEventListener("click", setTimerPreset));
