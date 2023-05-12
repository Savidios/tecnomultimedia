PImage img1, img2, img3;
int currentImage = 1;
int imageTime = 0; // Tiempo en milisegundos que se ha mostrado la imagen actual
boolean isDone = false;

// Clase para animar el texto en cada imagen
class AnimatedText {
  float x, y; // posición del texto
  float speed; // velocidad del texto
  String text; // texto a mostrar

  AnimatedText(float x, float y, float speed, String text) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.text = text;
  }

  // Actualizar la posición del texto
  void update() {
    y += speed;
  }

  // Mostrar el texto
  void display() {
    PFont font = createFont("arial", 32); // fuente
    textFont(font);
    textSize(32);
    fill(255);
    text(text, x, y);
  }
}

// Arreglos de objetos AnimatedText para cada imagen
AnimatedText[] text1;
AnimatedText[] text2;
AnimatedText[] text3;

void setup() {
  size(640, 480);
  img1 = loadImage("image1.jpg");
  img2 = loadImage("image2.jpg");
  img3 = loadImage("image3.jpg");

  
  // Inicializar el arreglo de objetos AnimatedText para cada imagen
  text1 = new AnimatedText[] {
    new AnimatedText(300, -50, 3, " autorL.Roche")
  };
  text2 = new AnimatedText[] {
    new AnimatedText(300, -50, 3, "autor:Jessica Gonpra")
  };
  text3 = new AnimatedText[] {
    new AnimatedText(300, -50, 3, "autor: Giulo Rossi")
  };
}

void draw() {
  background(0);

  if (!isDone) {
    if (currentImage == 1) {
      image(img1, 0, 0,640,480);
      for (AnimatedText t : text1) {
        t.update(); // Actualizar la posición del texto
        t.display(); // Mostrar el texto
      }
    } else if (currentImage == 2) {
      image(img2, 0, 0,640,480);
      for (AnimatedText t : text2) {
        t.update();
        t.display();
      }
    } else if (currentImage == 3) {
      image(img3,0, 0,640,480);
      for (AnimatedText t : text3) {
        t.update();
        t.display();
      }
    }
    
    // Si ha pasado suficiente tiempo desde la última imagen, avanzar a la siguiente
    if (millis() - imageTime > 3000) {
      currentImage++;
      imageTime = millis();
      
      // Si se ha mostrado la última imagen, marcar como finalizado
      if (currentImage > 3) {
        isDone = true;
      }
    }
    
  } else {
    // Mostrar la pantalla de reinicio
    background(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Presiona el botón para reiniciar", width/2, height/2);
    
    // Dibujar el botón de reinicio
    rectMode(CENTER);
    fill(200);
    rect(width/2, height/2 + 50, 150, 50, 10);
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Reiniciar", width/2, height/2 + 50);
    
    // Reiniciar la posición de los textos
    for (AnimatedText t : text1) {
      t.y = -50;
    }
    for (AnimatedText t : text2) {
      t.y = -50;
    }
    for (AnimatedText t : text3) {
      t.y = -50;
    }
  }
}
void mousePressed() {
  // Si el usuario hace clic en el botón de reinicio y se ha finalizado la animación
  if (mouseX > width/2 - 75 && mouseX < width/2 + 75 && mouseY > height/2 + 25 && mouseY < height/2 + 75 && isDone) {
    // Reiniciar la animación
    currentImage = 1;
    imageTime = millis();
    isDone = false;
  }
}
