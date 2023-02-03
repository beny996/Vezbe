const playerName = document.querySelector(".header-name");
const newName = document.querySelector(".new-name");
const currentColor = document.querySelector(".current-color");
const colorPicker = document.querySelector(".color-picker");
const colorContainer = document.querySelector(".options-item-container");
const colorRgb = document.querySelector(".rgb");
const colorHex = document.querySelector(".hex");
const colors = document.querySelectorAll(".game-item");
const nameChangeContainer = document.querySelector(".name-change-container");
const nameInput = document.querySelector("input");
const nameChangeButton = document.querySelector("button");
const scoreboardPlayer = document.querySelectorAll(".scoreboard-player td");
const scoreboardScore = document.querySelectorAll(".scoreboard-score td");
const gameEndWindow = document.querySelector(".game-end");
const gameEndScore = document.querySelector(".game-end-score span");
const gameEndButton = document.querySelector(".game-end-button");

let rgbColor;
let hexColor;
let correctPick;
let score = 1;

const localScoreboardItem = JSON.parse(localStorage.getItem("scoreboard"));
const scoreboardItems = localScoreboardItem ? [...localScoreboardItem] : [];

const slicedLocal = localScoreboardItem && localScoreboardItem.slice(0, 8);
let slicedItems = scoreboardItems.slice(0, 8);

const randomHex = () => {
  const hexValues = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }
  return hex;
};

const randomRgb = () =>
  `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)})`;

const colorFill = (color, type) => {
  let randomField = Math.floor(Math.random() * 5);
  colors[randomField].style.backgroundColor = color;
  correctPick = randomField;
  colors.forEach((color) => {
    color.style.display = "block";
    if (!color.style.backgroundColor) {
      color.style.backgroundColor =
        type === "rgb" ? randomRgb() : `${randomHex()}`;
    }
  });
};
if (localScoreboardItem) {
  for (let i = 0; i < slicedLocal.length; i++) {
    if (localScoreboardItem) {
      scoreboardPlayer[i].innerHTML = localScoreboardItem[i]?.name;
    }
  }
  for (let i = 0; i < slicedLocal.length; i++) {
    if (localScoreboardItem) {
      scoreboardScore[i].innerHTML = localScoreboardItem[i]?.score;
    }
  }
}

const scoreboardFill = () => {
  for (let i = 0; i < slicedItems.length; i++) {
    scoreboardPlayer[i].innerHTML = slicedItems[i]?.name;
  }
  for (let i = 0; i < slicedItems.length; i++) {
    scoreboardScore[i].innerHTML = slicedItems[i]?.score;
  }
};

colorPicker.addEventListener("click", () => {
  colorContainer.style.display = "block";
  colors.forEach((color) => {
    color.style.backgroundColor = "";
    color.style.display = "none";
  });
});

colorRgb.addEventListener("click", () => {
  rgbColor = randomRgb();
  currentColor.innerHTML = rgbColor;
  colorFill(rgbColor, "rgb");
  colorContainer.style.display = "none";
  colorPicker.style.pointerEvents = "none";
});

colorHex.addEventListener("click", () => {
  hexColor = `${randomHex()}`;
  currentColor.innerHTML = hexColor;
  colorFill(hexColor, "hex");
  colorContainer.style.display = "none";
  colorPicker.style.pointerEvents = "none";
});

colors.forEach((color, index) => {
  color.addEventListener("click", () => {
    if (index !== correctPick) {
      color.style.display = "none";
      score++;
    } else {
      scoreboardItems.unshift({ name: playerName.innerHTML, score: score });
      slicedItems = scoreboardItems.slice(0, 8);
      localStorage.setItem("scoreboard", JSON.stringify(slicedItems));
      gameEndWindow.style.display = "flex";
      gameEndScore.innerHTML = score;
      score = 1;
      scoreboardFill();
    }
  });
});

newName.addEventListener("click", () => {
  nameChangeContainer.style.display = "unset";
});

nameChangeButton.addEventListener("click", () => {
  if (nameInput.value) {
    playerName.innerHTML = nameInput.value;
  }
  nameInput.value = "";
  nameChangeContainer.style.display = "none";
});

gameEndButton.addEventListener("click", () => {
  colors.forEach((color) => {
    color.style.backgroundColor = "";
    color.style.display = "none";
  });
  currentColor.innerHTML = "";
  gameEndWindow.style.display = "";
  colorPicker.style.pointerEvents = "";
});
