const player1 = document.querySelector(".player-one .game-player-item-name");
const player2 = document.querySelector(".player-two .game-player-item-name");
const scorePlayer1 = document.querySelector(".score-one span");
const scorePlayer2 = document.querySelector(".score-two span");
const currentPlayer1 = document.querySelector(".current-one span");
const currentPlayer2 = document.querySelector(".current-two span");
const roll = document.querySelector(".roll");
const store = document.querySelector(".store");
const dicePlayer1 = document.querySelector(".dice-one img");
const dicePlayer2 = document.querySelector(".dice-two img");
const activePlayerArrow = document.querySelector(".game-active-player");
const gameWinnerWindow = document.querySelector(".game-winner");
const gameWinner = document.querySelector(".game-winner-heading span");
const playAgain = document.querySelector(".play-again");
const newGame = document.querySelector(".new-game");
const startMenu = document.querySelector(".game-start");
const start = document.querySelector(".game-start-button");
const inputPlayer1 = document.querySelector(".input1");
const inputPlayer2 = document.querySelector(".input2");
const countdownContainer = document.querySelector(".countdown");
const countdown = document.querySelector(".countdown-item");

const dices = [1, 2, 3, 4, 5, 6];

let activePlayer = 1;
let currentPlayerOne = 0;
let currentPlayerTwo = 0;
let scorePlayerOne = 0;
let scorePlayerTwo = 0;

const randomDice = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const dice = array[randomIndex];
  return dice;
};

const startOver = () => {
  currentPlayerOne = 0;
  currentPlayerTwo = 0;
  scorePlayerOne = 0;
  scorePlayerTwo = 0;
  activePlayer = 1;
  activePlayerArrow.style.cssText = "";
  dicePlayer1.setAttribute("src", "");
  dicePlayer2.setAttribute("src", "");
  currentPlayer1.innerHTML = "";
  currentPlayer2.innerHTML = "";
  scorePlayer1.innerHTML = "";
  scorePlayer2.innerHTML = "";
};

const checkForWinner = () => {
  if (scorePlayerOne + currentPlayerOne >= 50) {
    gameWinnerWindow.style.display = "flex";
    gameWinner.innerHTML = player1.innerHTML;
  }
  if (scorePlayerTwo + currentPlayerTwo >= 50) {
    gameWinnerWindow.style.display = "flex";
    gameWinner.innerHTML = player2.innerHTML;
  }
};

roll.addEventListener("click", () => {
  let dice = randomDice(dices);
  if (activePlayer === 1) {
    dicePlayer1.setAttribute("src", `images/dice${dice}.png`);
    activePlayerArrow.style.cssText = "";
    if (dice !== 1) {
      currentPlayerOne += dice;
      currentPlayer1.innerHTML = currentPlayerOne;
    } else {
      dicePlayer1.setAttribute("src", "images/dice1.png");
      activePlayerArrow.style.cssText = "rotate: 180deg; left: 52%";
      setTimeout(() => {
        dicePlayer1.setAttribute("src", "");
      }, 1000);
      currentPlayerOne = 0;
      activePlayer = 2;
      currentPlayer1.innerHTML = "";
    }
    checkForWinner();
  } else {
    activePlayerArrow.style.cssText = "rotate: 180deg; left: 52%";
    dicePlayer2.setAttribute("src", `images/dice${dice}.png`);
    if (dice !== 1) {
      currentPlayerTwo += dice;
      currentPlayer2.innerHTML = currentPlayerTwo;
    } else {
      activePlayerArrow.style.cssText = "";
      dicePlayer2.setAttribute("src", "images/dice1.png");
      setTimeout(() => {
        dicePlayer2.setAttribute("src", "");
      }, 1000);
      currentPlayerTwo = 0;
      activePlayer = 1;
      currentPlayer2.innerHTML = "";
    }
    checkForWinner();
  }
});

store.addEventListener("click", () => {
  if (activePlayer === 1) {
    activePlayerArrow.style.cssText = "rotate: 180deg; left: 52%";
    scorePlayerOne += currentPlayerOne;
    if (currentPlayerOne !== 0) {
      scorePlayer1.innerHTML = scorePlayerOne;
    }
    currentPlayerOne = 0;
    currentPlayer1.innerHTML = "";
    activePlayer = 2;
    dicePlayer1.setAttribute("src", "");
  } else {
    activePlayerArrow.style.cssText = "";
    scorePlayerTwo += currentPlayerTwo;
    if (currentPlayerTwo !== 0) {
      scorePlayer2.innerHTML = scorePlayerTwo;
    }
    currentPlayerTwo = 0;
    currentPlayer2.innerHTML = "";
    dicePlayer2.setAttribute("src", "");
    activePlayer = 1;
  }
  checkForWinner();
});

playAgain.addEventListener("click", () => {
  gameWinner.style.display = "none";
  gameWinnerWindow.style.display = "none";
  startOver();
});

newGame.addEventListener("click", () => {
  startMenu.style.display = "flex";
  gameWinnerWindow.style.display = "none";
});

start.addEventListener("click", () => {
  if (!inputPlayer1.value) {
    alert("Enter your name!");
    return;
  } else if (!inputPlayer2.value) {
    alert("Enter your name!");
    return;
  }
  player1.innerHTML = inputPlayer1.value;
  player2.innerHTML = inputPlayer2.value;

  let time = 3;

  countdownContainer.style.display = "flex";
  let interval = setInterval(() => {
    countdown.innerHTML = time;
    time--;
    if (time < 0) {
      countdownContainer.style.display = "none;";
      clearInterval(interval);
      startMenu.style.display = "none";
    }
  }, 1000);
});
