//video yt: https://www.youtube.com/watch?v=nl4fsY1D9vM
let game;

function preload() {
  // Cargar las imágenes
  snakeImg = loadImage('snake.png'); // Reemplazar 'snake.png' con el nombre de tu imagen de serpiente
  foodImg = loadImage('food.png');   // Reemplazar 'food.png' con el nombre de tu imagen de cuadrado rojo
}

function setup() {
  createCanvas(600, 600);
  game = new Game();  // Asegurarse de que 'game' se inicializa correctamente aquí
  game.initFood();    // Llamar a la función initFood después de que 'game' esté inicializado
}

function draw() {
  game.update();
  game.show();
}

function keyPressed() {
  game.handleKeyPressed();
}

class Game {
  constructor() {
    this.snake = new Snake();
    this.food = [];
    this.foodDirections = [];
    this.score = 0;
    this.gameState = 'play';
    this.startTime = millis();
  }

  initFood() {
    for (let i = 0; i < 3; i++) {
      this.food.push(new Food(this));  // Pasar la referencia de 'game' a 'Food'
      this.foodDirections.push(this.createRandomDirection());
    }
  }

  createRandomDirection() {
    const directions = [
      createVector(1, 0), // Derecha
      createVector(-1, 0), // Izquierda
      createVector(0, 1), // Abajo
      createVector(0, -1) // Arriba
    ];
    return random(directions);
  }

  update() {
    if (this.gameState === 'play') {
      // Lógica de actualización del juego
      this.snake.update();
      for (let i = this.food.length - 1; i >= 0; i--) {
        if (this.snake.eat(this.food[i])) {
          this.food.splice(i, 1);
          this.foodDirections.splice(i, 1);
          this.snake.grow();
          this.food.push(new Food(this));  // Pasar la referencia de 'game' a 'Food'
          this.foodDirections.push(this.createRandomDirection());
          this.score++;
        }
      }

      if (this.score >= 10) {
        this.gameState = 'victory';
      } else if (millis() - this.startTime > 60000) {
        this.gameState = 'loss';
      }
    }
  }

  show() {
    // Lógica de dibujo del juego
    scale(this.snake.rez);
    background(220);
    if (this.gameState === 'play') {
      for (let i = 0; i < this.food.length; i++) {
        this.food[i].display();
      }
      this.snake.show();
    } else if (this.gameState === 'victory') {
      // Pantalla de victoria
      textSize(8);
      textAlign(CENTER, CENTER);
      fill(0);
      text('¡Victoria!', this.snake.w / 2, this.snake.h / 2);

      // Botón de reinicio en la pantalla de victoria
      let buttonWidth = 120;
      let buttonHeight = 40;
      let buttonX = this.snake.w / 2 - buttonWidth / 2;
      let buttonY = this.snake.h / 2 + 40;

      fill(50, 50, 50);
      rect(buttonX, buttonY, buttonWidth, buttonHeight);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text('Reiniciar', this.snake.w / 2, this.snake.h / 2 + 60);

      // Verificar si se hace clic en el botón de victoria
      if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonHeight
      ) {
        if (mouseIsPressed) {
          // Reiniciar el juego
          this.restartGame();
        }
      }
    } else if (this.gameState === 'loss') {
      // Pantalla de pérdida
      textSize(8);
      textAlign(CENTER, CENTER);
      fill(255, 0, 0); // Color rojo
      text('¡Perdiste!', this.snake.w / 2, this.snake.h / 2);

      // Botón de reinicio en la pantalla de pérdida
      let buttonWidth = 120;
      let buttonHeight = 40;
      let buttonX = this.snake.w / 2 - buttonWidth / 2;
      let buttonY = this.snake.h / 2 + 40;

      fill(100, 100, 200);
      rect(buttonX, buttonY, buttonWidth, buttonHeight);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text('Reiniciar', this.snake.w / 2, this.snake.h / 2 + 60);

      // Verificar si se hace clic en el botón de pérdida
      if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonHeight
      ) {
        if (mouseIsPressed) {
          // Reiniciar el juego
          this.restartGame();
        }
      }
    }
  }

  handleKeyPressed() {
    // Lógica para manejar eventos de teclado
    if (this.gameState === 'play') {
      switch (keyCode) {
        case LEFT_ARROW:
          this.snake.setDir(-1, 0);
          break;
        case RIGHT_ARROW:
          this.snake.setDir(1, 0);
          break;
        case DOWN_ARROW:
          this.snake.setDir(0, 1);
          break;
        case UP_ARROW:
          this.snake.setDir(0, -1);
          break;
      }
    }
  }

  restartGame() {
    this.snake = new Snake();
    this.food = [];
    this.foodDirections = [];
    this.score = 0;
    this.gameState = 'play';
    this.startTime = millis();
    this.initFood();
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / this.rez / 2), floor(height / this.rez / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
    this.rez = 20;
    this.w = floor(width / this.rez);
    this.h = floor(height / this.rez);
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

class Food {
  constructor(game) {
    this.game = game;  // Almacena la referencia de 'game' en la instancia de 'Food'
    this.pos = createVector();
    this.spawn();
  }

  spawn() {
    this.pos.x = floor(random(this.game.w));
    this.pos.y = floor(random(this.game.h));
    while (this.game.snake.collides(this.pos.x, this.pos.y)) {
      // Respawn si la comida está en la posición de la serpiente
      this.pos.x = floor(random(this.game.w));
      this.pos.y = floor(random(this.game.h));
    }
  }

  display() {
    image(foodImg, this.pos.x, this.pos.y, 1, 1);
  }
}
