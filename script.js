// game config
let seconds = 0;
let minutes = 0;
let timer;
let arraySize = 4;
let moves = 0;
let volume = 0.1;

const gridItems = document.getElementsByClassName("grid__item");

// generate html
const containerElement = document.createElement("div");
containerElement.classList.add("container");
document.body.prepend(containerElement);

const buttonsElement = document.createElement("div");
buttonsElement.classList.add("buttons");
containerElement.append(buttonsElement);

const buttonRestartElement = document.createElement("button");
buttonRestartElement.classList.add("button", "button--restart");
buttonRestartElement.textContent = "Shuffle and restart";
buttonsElement.append(buttonRestartElement);

const buttonSaveElement = document.createElement("button");
buttonSaveElement.classList.add("button", "button--save");
buttonSaveElement.textContent = "Save";
buttonsElement.append(buttonSaveElement);

const buttonResultsElement = document.createElement("button");
buttonResultsElement.classList.add("button", "button--results");
buttonResultsElement.textContent = "Results";
buttonsElement.append(buttonResultsElement);

const buttonSoundElement = document.createElement("button");
buttonSoundElement.classList.add("button", "button--sound");
buttonSoundElement.textContent = "Sound: on";
buttonsElement.append(buttonSoundElement);
buttonSoundElement.addEventListener("click", () => {
  if (volume === 0.1) {
    volume = 0;
    buttonSoundElement.textContent = "Sound: off";
  } else {
    volume = 0.1;
    buttonSoundElement.textContent = "Sound: on";
  }
});

const statsElement = document.createElement("div");
statsElement.classList.add("stats");
containerElement.append(statsElement);

const movesElement = document.createElement("p");
movesElement.classList.add("moves");
movesElement.innerHTML = "Moves: ";
statsElement.append(movesElement);

const timeElement = document.createElement("p");
timeElement.classList.add("time");
timeElement.textContent = "Time: ";
statsElement.append(timeElement);

const timerElement = document.createElement("span");
timerElement.classList.add("time__timer");
timerElement.textContent = "00:00";
timeElement.append(timerElement);

const movesCountElement = document.createElement("span");
movesCountElement.classList.add("moves__count");
movesCountElement.innerHTML = "0";
movesElement.append(movesCountElement);

let gridElement = document.createElement("div");
let gameGrid = [];
containerElement.append(gridElement);

const frameSizeElement = document.createElement("p");
frameSizeElement.classList.add("frame-size");
frameSizeElement.textContent = `Frame size: ${arraySize}x${arraySize}`;
containerElement.append(frameSizeElement);

const otherSizesElement = document.createElement("div");
otherSizesElement.classList.add("other-sizes");
otherSizesElement.textContent = "Other sizes: ";
containerElement.append(otherSizesElement);

for (let i = 3; i < 9; i++) {
  let otherSize = document.createElement("p");
  otherSize.classList.add("other-size");
  otherSize.textContent = `${i}x${i}`;
  otherSize.addEventListener("click", () => {
    arraySize = i;
    startGame(arraySize);
  });
  otherSizesElement.append(otherSize);
}

buttonRestartElement.addEventListener("click", () => {
  resetGame();
});

startGame(arraySize);

function startGame(gridSize) {
  pauseTimer();
  resetGame();
  initGameGrid(gridSize);
  activateGrid(gridSize);
  startTimer();
  frameSizeElement.textContent = `Frame size: ${arraySize}x${arraySize}`;
}

function initGameGrid(gridSize) {
  gridElement.innerHTML = null;
  gameGrid = generateArray(gridSize);
  gridElement.className = "";
  gridElement.classList.add(`grid--${gridSize}x${gridSize}`);
  for (let i = 0; i < gridSize * gridSize; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid__item");
    gridItem.textContent = gameGrid[i];
    if (gridItem.textContent === "") {
      gridItem.classList.add("empty");
    } else {
      gridItem.classList.remove("empty");
    }
    gridElement.append(gridItem);
  }
}

function activateGrid(arraySize) {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", () => {
      if (gridItems[i].textContent == "") {
        console.log("empty cell clicked");
      } else {
        if (gridItems[i + 1] && gridItems[i + 1].textContent === "") {
          moveCell(i, i + 1);
          playSound();
        } else if (gridItems[i - 1] && gridItems[i - 1].textContent === "") {
          moveCell(i, i - 1);
          playSound();
        } else if (
          gridItems[i + arraySize] &&
          gridItems[i + arraySize].textContent === ""
        ) {
          moveCell(i, i + arraySize);
          playSound();
        } else if (
          gridItems[i - arraySize] &&
          gridItems[i - arraySize].textContent === ""
        ) {
          moveCell(i, i - arraySize);
          playSound();
        }
      }
    });
  }
}

function moveCell(cellIndex, emptyCellIndex) {
  gridItems[emptyCellIndex].classList.toggle("empty");
  gridItems[emptyCellIndex].textContent = gridItems[cellIndex].textContent;
  gridItems[cellIndex].classList.toggle("empty");
  gridItems[cellIndex].textContent = "";
  moves++;
  movesCountElement.textContent = moves;
}

function playSound() {
  let audio = new Audio("sound.m4a");
  audio.volume = volume;
  audio.play();
}

function resetGame() {
  timerElement.textContent = "00:00";
  seconds = 0;
  minutes = 0;
  moves = 0;
  movesCountElement.textContent = moves;
  initGameGrid(arraySize);
  activateGrid(arraySize);
  console.log(gameGrid);
}

function startTimer() {
  timer = setInterval(() => {
    timerElement.textContent =
      (minutes < 10 ? `0${minutes}` : minutes) +
      ":" +
      (seconds < 10 ? `0${seconds} ` : seconds);
    seconds++;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function generateArray(size) {
  let array = [];
  for (let i = 1; i <= size * size; i++) {
    array.push(i);
  }
  const emptyIndex = Math.floor(Math.random() * (array.length - 1));
  array[emptyIndex] = "";
  array = shuffleArray(array);
  return array;
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
}
