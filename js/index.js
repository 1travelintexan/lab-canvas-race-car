//draw the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

//canvas variables
let height = canvas.height - 200;
let middle = canvas.width / 2 + 60;
let playerX = canvas.width / 2 + 60;

//all varibles
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");
let logo = document.querySelector("#logo-img");
let arrows = document.querySelector("#arrows-img");

//background
let bg = new Image();
bg.src = "../images/road.png";

//all vehicles
let car = new Image();
car.src = "../images/car.png";

let carPink = new Image();
carPink.src = "../images/carPink.png";
let carWhite = new Image();
carWhite.src = "../images/carWhite.png";
let carYellow = new Image();
carYellow.src = "../images/carYellow.png";
// let bus = new Image();
// bus.src = "../images/bus-top.png";

// let motorcycle = new Image();
// motorcycle.src = "../images/motorcycle.png";

let moveRight = false;
let moveLeft = false;

//variables for sizes and movements
let carsY = -200;
let speed = 5;
let intervalId = 0;
let isGameOver = false;

//traffic cars information
let carArray = [
  { x: middle, y: -200 },
  { x: middle - 200, y: -600 },
  { x: middle, y: -900 },
];

//start game function
function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  arrows.style.display = "block";

  //draw background
  ctx.drawImage(bg, 0, 0, 500, 700);

  //draw motorcycle
  ctx.drawImage(car, playerX, height, 80, 150);

  for (let i = 0; i < carArray.length; i++) {
    ctx.drawImage(carPink, carArray[i].x, carArray[i].y, 80, 110);
    carArray[i].y += speed;
    //ctx.drawImage(car, middle + 50, height, 80, 150);
    if (carArray[i].y > canvas.height) {
      carArray[i].y = -700;
    }
  }

  if (playerX < canvas.width - 120 && moveRight) {
    playerX += 5;
  } else if (playerX > 50 && moveLeft) {
    playerX -= 5;
  }

  //listener for player movement
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      moveRight = true;
    } else if (event.code === "ArrowLeft") {
      moveLeft = true;
    }
  });
  document.addEventListener("keyup", () => {
    moveRight = false;
    moveLeft = false;
  });
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(startGame);
  }
}
//restart game function
function restartGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  arrows.style.display = "block";
}

//game begins here
window.addEventListener("load", () => {
  canvas.style.display = "none";
  startBtn.style.display = "block";
  restartBtn.style.display = "none";
  logo.style.display = "block";
  arrows.style.display = "none";

  startBtn.addEventListener("click", () => {
    startGame();
    console.log("start button pushed!");
  });
  restartBtn.addEventListener("click", () => {
    restartGame();
  });
});
