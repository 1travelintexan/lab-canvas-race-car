//draw the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

//test for github

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

let car2 = new Image();
car2.src = "../images/car-top.png";

let bus = new Image();
bus.src = "../images/bus-top.png";

let motorcycle = new Image();
motorcycle.src = "../images/motorcycle.png";

let intervalId = 0;
let isGameOver = false;

//start game function
function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  arrows.style.display = "block";

  //canvas variables
  let height = canvas.height - 120;
  let middle = canvas.width / 2 - 20;

  //draw background
  ctx.drawImage(bg, 0, 0, 500, 700);

  //draw motorcycle
  ctx.drawImage(motorcycle, middle, height, 40, 80);

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
