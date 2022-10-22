const gridItems = document.querySelectorAll(".grid__item");
const buttonRestart = document.querySelector(".button--restart");
const movesCount = document.querySelector(".moves__count");
const timerElement = document.querySelector(".time__timer");

let seconds = 0;
let minutes = 0;
let timer;
let arraySize = 4;
startTimer();

let moves = 0;
movesCount.textContent = moves;

buttonRestart.addEventListener("click", () => {
  resetGame();
});

let gameGrid = generateArray(arraySize);
activateGrid(arraySize);

// starts the game
for (let i = 0; i < gridItems.length; i++) {
  gridItems[i].textContent = gameGrid[i];
  if (gridItems[i].textContent === "") {
    gridItems[i].classList.add("empty");
  } else {
    gridItems[i].classList.remove("empty");
  }
}

console.log(gameGrid);

function activateGrid(arraySize) {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].addEventListener("click", () => {
      if (gridItems[i].textContent == "") {
        console.log("empty cell clicked");
      } else {
        if (gridItems[i + 1] && gridItems[i + 1].textContent === "") {
          gridItems[i + 1].classList.toggle("empty");
          gridItems[i + 1].textContent = gridItems[i].textContent;
          gridItems[i].classList.toggle("empty");
          gridItems[i].textContent = "";
          moves++;
          movesCount.textContent = moves;
        } else if (gridItems[i - 1] && gridItems[i - 1].textContent === "") {
          gridItems[i - 1].classList.toggle("empty");
          gridItems[i - 1].textContent = gridItems[i].textContent;
          gridItems[i].classList.toggle("empty");
          gridItems[i].textContent = "";
          moves++;
          movesCount.textContent = moves;
        } else if (
          gridItems[i + arraySize] &&
          gridItems[i + arraySize].textContent === ""
        ) {
          gridItems[i + arraySize].classList.toggle("empty");
          gridItems[i + arraySize].textContent = gridItems[i].textContent;
          gridItems[i].classList.toggle("empty");
          gridItems[i].textContent = "";
          moves++;
          movesCount.textContent = moves;
        } else if (
          gridItems[i - arraySize] &&
          gridItems[i - arraySize].textContent === ""
        ) {
          gridItems[i - arraySize].classList.toggle("empty");
          gridItems[i - arraySize].textContent = gridItems[i].textContent;
          gridItems[i].classList.toggle("empty");
          gridItems[i].textContent = "";
          moves++;
          movesCount.textContent = moves;
        }
      }
    });
  }
}

function resetGame() {
  timerElement.textContent = "00:00";
  seconds = 0;
  minutes = 0;
  moves = 0;
  movesCount.textContent = moves;
  gameGrid = generateArray(4);
  gameGrid = shuffleArray(gameGrid);
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].textContent = gameGrid[i];
    if (gridItems[i].textContent === "") {
      gridItems[i].classList.add("empty");
    } else {
      gridItems[i].classList.remove("empty");
    }
  }
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
  for (let i = 0; i < size * size; i++) {
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
