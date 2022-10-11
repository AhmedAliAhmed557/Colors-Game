let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let alert = document.querySelector(".alert");
let closebtn = document.querySelector(".closebtn");

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      modeButtons[2].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy"
        ? (numSquares = 3)
        : (numSquares = 6) && this.textContent === "Middle"
        ? (numSquares = 6)
        : (numSquares = 9);
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    //add click listeners to squares
    squares[i].addEventListener("click", function () {
      //grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if (clickedColor === pickedColor) {
        showAlert();
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetButton.style.backgroundColor = clickedColor;
        for (let i = 0; i < modeButtons.length; i++) {
          if (modeButtons[i].classList.contains("selected")) {
            modeButtons[i].style.backgroundColor = clickedColor;
          }
          console.log(modeButtons[i]);
        }
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked Color
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  resetButton.style.backgroundColor = "steelblue";
  resetButton.style.color = "white";
  for (let i = 0; i < modeButtons.length; i++) {
    if (modeButtons[i].classList.contains("selected")) {
      modeButtons[i].style.backgroundColor = "";
    }
    console.log(modeButtons[i]);
  }
  //change colors of squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.background = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColors(color) {
  //loop through all squares
  for (let i = 0; i < squares.length; i++) {
    //change each color to match given color
    squares[i].style.background = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  let arr = [];
  //repeat num times
  for (let i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a "red" from 0 - 255
  let r = Math.floor(Math.random() * 256);
  //pick a "green" from  0 -255
  let g = Math.floor(Math.random() * 256);
  //pick a "blue" from  0 -255
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

///////////////////////////
function showAlert() {
  alert.style.display = "block";
  alert.style.backgroundColor = pickedColor;
  h1.style.background = "steelblue";
}
