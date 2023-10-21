//video youtube: https://www.youtube.com/watch?v=HD5VImh27y0
//Dante Savinelli 92828/5
let snake;
let rez = 20; // Tamaño de las celdas del juego
let food = [];
let foodSpeed = 1; // Velocidad de los cuadrados rojos
let foodDirections = []; // Direcciones de movimiento de los cuadrados rojos
let w;
let h;
let snakeImg;
let foodImg;
let score = 0; // Contador de alimentos comidos
let gameState = 'play'; // Estado del juego: 'play', 'victory' o 'loss'
let startTime; // Tiempo de inicio del juego

function preload() {
  snakeImg = loadImage('snake.png'); // Reemplaza 'snake.png' con el nombre de tu imagen de serpiente
  foodImg = loadImage('food.png'); // Reemplaza 'food.png' con el nombre de tu imagen de cuadrado rojo
}

function setup() {
  createCanvas(600, 600);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(10);
  snake = new Snake();
  for (let i = 0; i < 3; i++) {
    food.push(createFood());
    foodDirections.push(createRandomDirection());
  }
  startTime = millis(); // Registra el tiempo de inicio del juego
}

function createFood() {
  let x, y;
  do {
    x = floor(random(w));
    y = floor(random(h));
  } while (snake.collides(x, y) || foodCollides(x, y));
  return createVector(x, y);
}

function createRandomDirection() {
  const directions = [
    createVector(1, 0), // Derecha
    createVector(-1, 0), // Izquierda
    createVector(0, 1), // Abajo
    createVector(0, -1) // Arriba
  ];
  return random(directions);
}

function foodCollides(x, y) {
  for (let i = 0; i < food.length; i++) {
    if (food[i].x === x && food[i].y === y) {
      return true;
    }
  }
  return false;
}

function draw() {
  scale(rez);
  background(220);

  if (gameState === 'play') {
    // Lógica del juego actual
    for (let i = 0; i < food.length; i++) {
      let x = food[i].x;
      let y = food[i].y;
      image(foodImg, x, y, 1, 1);
    }

    snake.update();
    snake.show();

    for (let i = food.length - 1; i >= 0; i--) {
      if (snake.eat(food[i])) {
        food.splice(i, 1);
        foodDirections.splice(i, 1);
        snake.grow();
        food.push(createFood());
        foodDirections.push(createRandomDirection());
        score++; // Incrementa el contador de alimentos comidos
      }
    }

    if (score >= 10) {
      gameState = 'victory'; // Cambia al estado de victoria
    } else if (millis() - startTime > 60000) { // 60000 ms = 60 segundos
      gameState = 'loss'; // Cambia al estado de pérdida
    }
  } else if (gameState === 'victory') {
    // Pantalla de victoria
    textSize(8);
    textAlign(CENTER, CENTER);
    fill(0);
    text('¡Victoria!', w / 2, h / 2);

    // Botón de reinicio en la pantalla de victoria
    let buttonWidth = 120;
    let buttonHeight = 40;
    let buttonX = w / 2 - buttonWidth / 2;
    let buttonY = h / 2 + 40;

    fill(50, 50, 50);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Reiniciar', w / 1, h / 1 + 60);

    // Verifica si se hace clic en el botón de victoria
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      if (mouseIsPressed) {
        // Reinicia el juego
        restartGame();
      }
    }
  } else if (gameState === 'loss') {
    // Pantalla de pérdida
    textSize(8);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0); // Color rojo
    text('¡Perdiste!', w / 2, h / 2);

    // Botón de reinicio en la pantalla de pérdida
    let buttonWidth = 120;
    let buttonHeight = 40;
    let buttonX = w / 2 - buttonWidth / 2;
    let buttonY = h / 2 + 40;

    fill(100, 100, 200);
    rect(buttonX, buttonY, buttonWidth, buttonHeight);
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text('Reiniciar', w / 2, h / 2 + 60);

    // Verifica si se hace clic en el botón de pérdida
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth &&
        mouseY > buttonY && mouseY < buttonY + buttonHeight) {
      if (mouseIsPressed) {
        // Reinicia el juego
        restartGame();
      }
    }
  }
}

function restartGame() {
  snake = new Snake();
  food = [];
  foodDirections = [];
  score = 0;
  gameState = 'play';
  startTime = millis(); // Reinicia el tiempo de inicio
  for (let i = 0; i < 3; i++) {
    food.push(createFood());
    foodDirections.push(createRandomDirection());
  }
}

function keyPressed() {
  switch (keyCode) {
    case LEFT_ARROW:
      snake.setDir(-1, 0);
      break;
    case RIGHT_ARROW:
      snake.setDir(1, 0);
      break;
    case DOWN_ARROW:
      snake.setDir(0, 1);
      break;
    case UP_ARROW:
      snake.setDir(0, -1);
      break;
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();

    this.body.shift();

    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
  }

  collides(x, y) {
    for (let i = 0; i < this.body.length; i++) {
      if (this.body[i].x === x && this.body[i].y === y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      let x = this.body[i].x;
      let y = this.body[i].y;
      image(snakeImg, x, y, 1, 1);
    }
  }
}
