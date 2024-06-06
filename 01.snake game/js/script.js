/** @format */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log(ctx);

const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

//w/c is canvas hight/scale and width/scale

//array to save the bodies of the snake

const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
let score = 0;

let snake = [
  {
    x: scale * 4,
    y: 0,
  },
  { x: scale * 3, y: 0 },
  { x: scale * 2, y: 0 },
  { x: scale, y: 0 },
  { x: 0, y: 0 },
];

console.log(snake);

let food = {
  x: Math.floor(Math.random() * rows) * scale,
  y: Math.floor(Math.random() * cols) * scale,
};

//call draw function every 100ms
let playGame = setInterval(draw, 100);

function displayGameOver() {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
  
}

//control the snake direction let's initially move to right

let d = "right";
//use the keyboard key to control the direction of the snake
document.onkeydown = direction;
resetBtn.onclick = resetGame;
function direction(e) {
  e.preventDefault();
  let key = e.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

//draw the snake and the food
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  running = true;
  //the snake
  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = "lime";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  console.log(snake);
  //the food
  ctx.fillStyle = "red";
  ctx.strokeStyle = "white";
  ctx.fillRect(food.x, food.y, scale, scale);
  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  console.log(snakeX);
  //determine direction
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  //if the snake eat the food it grows
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreText.textContent = score;

    food = {
      x: Math.floor(Math.random() * cols) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
    //don't remove the tail
  } else {
    //remove the tail
    snake.pop();
  }
  // New head position
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  console.log(snake);

  if (GameOverCondition(newHead, snake)) {
    displayGameOver();
  clearInterval(playGame);
  }
  snake.unshift(newHead);
}

function GameOverCondition(head, array) {
 //if the snake touch every corner of canvas the game will end
  if (
   head.x >= canvas.width ||
   head.y >= canvas.height ||
   head.x < 0 ||
   head.y < 0
 ) {
   return true;
 }
 //if the snake eat itself the game will over
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
  
}

// function to restart the game after game over
function resetGame() {
  score = 0;
  scoreText.textContent = score;
snake = [
  {
    x: scale * 4,
    y: 0,
  },
  { x: scale * 3, y: 0 },
  { x: scale * 2, y: 0 },
  { x: scale, y: 0 },
  { x: 0, y: 0 },
  ];
  
  food = {
    x: Math.floor(Math.random() * rows) * scale,
    y: Math.floor(Math.random() * cols) * scale,
  };
clearInterval(playGame);
playGame = setInterval(draw, 100);}



