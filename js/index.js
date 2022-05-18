//draw the canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.border = "2px solid black";

//canvas variables
let height = canvas.height - 200;
let middle = canvas.width / 2 + 60;

//player car demensions
let playerWidth = 130;
let playerHeight = 150;
let playerX = canvas.width / 2 + 60;
let playerY = canvas.height - playerHeight - 5;

//all varibles
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");
let logo = document.querySelector("#logo-img");
let gameLogo = document.querySelector("#game-logo");
let arrows = document.querySelector("#arrows-img-div");
let scoreDiv = document.querySelector("#score-div");
let scoreElement = document.querySelector("#score");
let gameBoard = document.querySelector("#game-board");

//background
let bg = new Image();
bg.src = "images/road.png";

//all vehicles
let car = new Image();
car.src = "images/racecar1.png";
let carPink = new Image();
carPink.src = "images/carPink.png";
let carWhite = new Image();
carWhite.src = "/images/carWhite.png";
let carYellow = new Image();
carYellow.src = "/images/carYellow.png";
let bus = new Image();
bus.src = "/images/bus.png";
// let motorcycle = new Image();
// motorcycle.src = "../images/motorcycle.png";

let moveRight = false;
let moveLeft = false;

//variables for sizes and movements
let speed = 5;
let intervalId = 0;
let isGameOver = false;
let score = 0;

//generate random 'X' positions on the road for the traffic
let randomXPlacement = () => {
  let biggestX = canvas.width - 350;
  let smallestX = 55;
  let randomX = Math.floor(
    Math.random() * (biggestX - smallestX + 1) + smallestX
  );
  console.log(randomX);
  return randomX;
};
//traffic cars information
let carArray = [
  { img: carPink, x: randomXPlacement(), y: -200, width: 110, height: 170 },
  {
    img: carWhite,
    x: randomXPlacement() - 300,
    y: -800,
    width: 130,
    height: 220,
  },
  { img: carYellow, x: randomXPlacement(), y: -1600, width: 130, height: 220 },
  { img: bus, x: randomXPlacement(), y: -2300, width: 240, height: 520 },
  { img: carPink, x: randomXPlacement(), y: -3000, width: 110, height: 170 },
  {
    img: carWhite,
    x: randomXPlacement() - 300,
    y: -3700,
    width: 130,
    height: 220,
  },
  { img: carYellow, x: randomXPlacement(), y: -4300, width: 130, height: 220 },
  { img: bus, x: randomXPlacement(), y: -5000, width: 240, height: 520 },
];

//start game function
function startGame() {
  canvas.style.display = "block";
  startBtn.style.display = "none";
  logo.style.display = "none";
  gameLogo.style.display = "flex";
  arrows.style.display = "none";
  scoreDiv.style.display = "block";
  gameBoard.style.display = "flex";

  //draw background
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  //draw motorcycle
  ctx.drawImage(car, playerX, playerY, playerWidth, playerHeight);

  for (let i = 0; i < carArray.length; i++) {
    ctx.drawImage(
      carArray[i].img,
      carArray[i].x,
      carArray[i].y,
      carArray[i].width,
      carArray[i].height
    );
    carArray[i].y += speed;
    //ctx.drawImage(car, middle + 50, height, 80, 150);
    if (carArray[i].y > canvas.height) {
      carArray[i].y = -5500;
    }

    //score handling login (inside of for loop!), if traffic car passes player car... score ++
    if (
      carArray[i].y > playerY + playerHeight &&
      carArray[i].y <= playerY + playerHeight + speed
    ) {
      score = score + 1;
      scoreElement.innerHTML = score;
    }

    //collision inside of for loop
    if (
      // checks if the bottom of the traffic car is touching the top of the player car
      carArray[i].y + carArray[i].height >= playerY + 10 &&
      //checks if the right side of the player car is more to the right than the traffic car
      playerX + 120 > carArray[i].x &&
      // checks if the left side of the player car is touching the left side of the traffic car
      playerX < carArray[i].x + carArray[i].width &&
      //checks if the bottom of the player car is touching the top of the traffic car
      playerY + playerHeight - 10 > carArray[i].y
    ) {
      isGameOver = true;
    }
  }

  if (playerX < canvas.width - 150 && moveRight) {
    playerX += 5;
  } else if (playerX > 35 && moveLeft) {
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

  //if statement for game over
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameover();
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

function gameover() {
  canvas.style.display = "none";
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
  gameLogo.style.display = "none";
  arrows.style.display = "flex";
  scoreDiv.style.display = "none";
  gameBoard.style.display = "none";

  startBtn.addEventListener("click", () => {
    startGame();
    console.log("start button pushed!");
  });
  restartBtn.addEventListener("click", () => {
    restartGame();
  });
});
