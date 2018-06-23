/*jshint esversion: 6 */

let rows = 600/20;
let cols = 600/20;
let dir = 0; //{0, 1, 2, 3, -1} : {N, E, S, W, undef}
let prev_dir = -1;
let player;
let length = 3;
let snake_history;
let apples = [];
let us_x, us_y;
let START_X = 15;
let START_Y = 15;
let dead= 0;
let tickrate = 8;
let highscore = 0;

let extraApples;
let appleFactor = 1;
let bonusUnlocked = 0;

let snakeColor = [255, 0, 0];

let totalApples = 0;

function shortcut() {
  document.getElementById('shortcut').setAttribute("class", "allblue");
  document.getElementById('img_shortcut').setAttribute("src", "images/sel_icon.png");
}

function pageclick(){
  if(mouseX > 785 || mouseX < 700 || mouseY > 385 || mouseY < 300){
    document.getElementById('shortcut').setAttribute("class", "uglyblue");
    document.getElementById('img_shortcut').setAttribute("src", "images/icon.png");
  }
}

function openMenu() {
  document.getElementById('menu').style.cssText = "display: block;";
}

function closeMenu() {
  document.getElementById('menu').style.cssText = "display: none;";
}


function make2Darray(rows, cols){
    var arr = new Array(rows);
    for (let i=0; i<arr.length; i++){
      arr[i] = new Array(cols);
    }
    return arr;
}

function bottombar() {
  fill(195);
  rect(-1, 600, 601, 40);
  fill(0);
  textSize(22);
  text("Score: ", 10, 630);
  text(length-3, 90, 630);
  text("Ticks/s:", 180, 630);
  text(tickrate.toFixed(1), 272, 630);
  text("Highscore:", 380, 630);
  text(highscore, 505, 630);
}

function drawBlocks() {
  fill(200);
  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++){
      rect(i*20+2, j*20+2, 16, 16);
    }
  }
}

class user {
  constructor(){
  }

  showI() {
    fill(snakeColor);
    // rect(us_x*20+2, us_y*20+2, 16, 16);
    for(let i = 0; i<length; i++)
      rect(snake_history[snake_history.length-1-i][0]*20+2, snake_history[snake_history.length-1-i][1]*20+2, 16, 16);
  }

  moves() {
    if (dir==1) us_x++;
    if (dir==3) us_x--;
    if (dir==2) us_y++;
    if (dir==0) us_y--;
    prev_dir = dir;

    snake_history[snake_history.length] = new Array(2);
    snake_history[snake_history.length-1][0] = us_x;
    snake_history[snake_history.length-1][1] = us_y;
  }

  eat() {
    for (let i=0; i<apples.length; i++) {
    if (us_x == apples[i].x && us_y == apples[i].y){
      length++;
      tickrate += 0.3; // increase speed every time it eats an apple
      frameRate(tickrate);
      apples[i] = new apple();
    }
  }

    for (let i = 1; i<length; i++){
      if (us_x == snake_history[snake_history.length-1-i][0] && us_y == snake_history[snake_history.length-1-i][1]) {
        gameOver();
      }
    }

    if (us_x > 29 || us_y > 29 || us_x < 0 || us_y < 0) gameOver();
  }

}

class apple {
  constructor() {
      this.x = floor(random(0, 30));
      this.y = floor(random(0, 30));
      for(let i = 0; i<length; i++){
        if (snake_history[snake_history.length-1-i][0] == this.x && snake_history[snake_history.length-1-i][1] == this.y){
          this.x = floor(random(0, 30));
          this.y = floor(random(0, 30));
          i=0;
        }
      }
    }

  showI() {
    fill(50, 100, 150);
    rect(this.x*20+2, this.y*20+2, 16, 16);
  }
}

function keyPressed() {
    if((keyCode == UP_ARROW || keyCode == 87) && prev_dir != 2) dir = 0;
    if ((keyCode == LEFT_ARROW || keyCode == 65) && prev_dir != 1) dir = 3;
    if ((keyCode == RIGHT_ARROW || keyCode == 68) && prev_dir != 3) dir = 1;
    if ((keyCode == DOWN_ARROW || keyCode == 83) && prev_dir != 0) dir = 2;

    if (dead == 1 && (keyCode == 82 || keyCode == 32)) {
      createSnake();
    }

    return 0;
}

function gameOver() {
  extraApples = floor(pow(appleFactor, length))-1;
  totalApples += length-3 + extraApples;
  dead = 1;
  dir = floor(random(0,4));
  gameText();
  frameRate(0);
}

function gameText() {
  console.log("GAME OVER!");
  fill(255);
  textSize(40);
  text("GAME OVER!", 160, 260);
  textSize(20);
  text("Press \"R\" to restart", 200, 310);
  textSize(20);
  if (bonusUnlocked){
  text("Bonus apples: ", 7, 590);
  text(extraApples, 150, 590);
  }
    if (length-3 > highscore) highscore = length-3;
    bottombar();
}

function createSnake() {
  dead = 0;
  tickrate = 8;
  length = 3;
  background(0);
  us_x = START_X;
  us_y = START_Y;
  snake_history = make2Darray(length, 2);
  player = new user();
  apples[0] = new apple();
  frameRate(tickrate);
}

function setup() {
  let cnv = createCanvas(600, 640);
  cnv.parent('game');
  createSnake();
}

function draw() {
  // drawBlocks();
  background(0);
  bottombar();
  for (let i=0; i<apples.length; i++) apples[i].showI();
  player.showI();
  player.moves();
  player.eat();
  document.getElementById('dispApples').innerHTML = "Total apples: " + totalApples;
  if (bonusUnlocked)
    document.getElementById('bonus').innerHTML = "Bonus factor: " + appleFactor.toFixed(2);
  storeItems();
  col_storeItems();
}
