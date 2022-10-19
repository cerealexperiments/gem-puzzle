const gridItems = document.querySelectorAll(".grid__item");
const buttonRestart = document.querySelector(".button--restart");
const movesCount = document.querySelector(".moves__count");
const timerElement = document.querySelector(".time__timer");

let seconds = 0;
let minutes = 0;
startTimer();

let moves = 0;
movesCount.textContent = moves;

buttonRestart.addEventListener("click", () => {
  resetGame();
});

let gameGrid = generateArray(4);
console.log(generateArray(3));

// starts the game
let gameGridOneDimensional = [].concat(...gameGrid);
for (let i = 0; i < gridItems.length; i++) {
  gridItems[i].textContent = gameGridOneDimensional[i];
  if (gridItems[i].textContent === "") {
    gridItems[i].classList.add("empty");
  } else {
    gridItems[i].classList.remove("empty");
  }
}

console.log(gameGrid);
console.log(gameGridOneDimensional);

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
      } else if (gridItems[i + 4] && gridItems[i + 4].textContent === "") {
        gridItems[i + 4].classList.toggle("empty");
        gridItems[i + 4].textContent = gridItems[i].textContent;
        gridItems[i].classList.toggle("empty");
        gridItems[i].textContent = "";
        moves++;
        movesCount.textContent = moves;
      } else if (gridItems[i - 4] && gridItems[i - 4].textContent === "") {
        gridItems[i - 4].classList.toggle("empty");
        gridItems[i - 4].textContent = gridItems[i].textContent;
        gridItems[i].classList.toggle("empty");
        gridItems[i].textContent = "";
        moves++;
        movesCount.textContent = moves;
      }
    }
  });
}

function resetGame() {
  timerElement.textContent = "00:00";
  seconds = 0;
  minutes = 0;
  moves = 0;
  movesCount.textContent = moves;
  gameGrid = generateArray(4);
  gameGridOneDimensional = [].concat(...gameGrid);
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].textContent = gameGridOneDimensional[i];
    if (gridItems[i].textContent === "") {
      gridItems[i].classList.add("empty");
    } else {
      gridItems[i].classList.remove("empty");
    }
  }
  console.log(gameGrid);
}

function startTimer() {
  let timer = setInterval(() => {
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

function generateArray(size) {
  const array = [];
  for (let i = 0; i < size * size; i++) {
    array.push(i);
  }
  const emptyIndex = Math.floor(Math.random() * (array.length - 1));
  array[emptyIndex] = "";
  shuffleArray(array);
  return array;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
