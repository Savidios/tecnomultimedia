//https://https://www.youtube.com/watch?v=nZnEtuArz1E
PImage[] img = new PImage [11];
PFont fuente;
Button botonIniciar;
Button botonSiguiente;
Button botonSi;
Button botonNo;
Button botonPelearSi;
Button botonOpcion1;
Button botonOpcion2;
Button botonNormal;
Button segundoBoton;
Button botonSiguiente9;
Button botonSiguiente10;
Button botonCreditos; // Nuevo botón de "Créditos"
Button botonVolver; // Nuevo botón de "Volver" en la pantalla 5 y de la pantalla de créditos
Button botonVolverCreditos; // Nuevo botón de "Volver" en la pantalla de créditos
Button botonNormal2;
int pantallaActual = 1;

void setup() {
  size(600, 600);
  
  img[0] = loadImage("fondo.jpg");
  img [1] = loadImage("fondo2.jpg");
  img [2] = loadImage("fondo3.jpg");
  img [3] = loadImage("fondo4.jpg");
  img [4] = loadImage("fondo5.jpg");
  img [5] = loadImage("fondo6.jpg");
  img [6] = loadImage("fondo7.jpg");
  img [7] = loadImage("fondo8.jpg");
  img [8] = loadImage("fondo9.jpg");
  img [9] = loadImage("fondo10.jpg");
  img [10] = loadImage("fondo_creditos.jpg"); // Carga el nuevo fondo para la pantalla de créditos
  
  fuente = createFont("Arial", 20);
  
  botonIniciar = new Button(width/2 - 100, height/2, 200, 50, "Iniciar");
  botonSiguiente = new Button(width - 150, height - 80, 120, 50, "Siguiente");
  botonSi = new Button(width/2 - 150, height/2, 120, 50, "Sí");
  botonNo = new Button(width/2 + 30, height/2, 120, 50, "No");
  botonPelearSi = new Button(width/2 - 60, height/2, 120, 50, "Sí");
  botonOpcion1 = new Button(width/2 - 200, height - 100, 150, 50, "De ladrillos");
  botonOpcion2 = new Button(width/2, height - 100, 150, 50, "De paja");
  botonNormal = new Button(width/2 - 60, height/2 + 70, 120, 50, "Volver al \n inicio");
  botonNormal2 = new Button(width/2 - 60, height/2 + 70, 120, 50, "No correr");
  segundoBoton = new Button(width/2 - 60, height/2, 120, 50, "Correr");
  botonSiguiente9 = new Button(width - 150, height - 80, 120, 50, "Siguiente");
  botonSiguiente10 = new Button(width/2 - 60, height/2, 120, 50, "Volver");
  botonCreditos = new Button(width/2 - 100, height/2 + 80, 200, 50, "Créditos"); // Crea el botón de "Créditos"
  botonVolver = new Button(width - 150, height - 80, 120, 50, "Volver"); // Crea el botón de "Volver" en la pantalla 5 y de la pantalla de créditos
  botonVolverCreditos = new Button(width - 150, height - 80, 120, 50, "Volver"); // Crea el botón de "Volver" en la pantalla de créditos
}

void draw() {
  background(255);
  
  if (pantallaActual == 1) {
    image(img [0], 0, 0, width, height);
    botonIniciar.display();
    botonCreditos.display(); // Muestra el botón de "Créditos" en la pantalla 1
  } else if (pantallaActual == 2) {
    image(img [1], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("Los 3 cerditos se van de la casa de su madre", width/2, 60);
    botonSiguiente.display();
  } else if (pantallaActual == 3) {
    image(img [2], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("¿Queres construir una casa al igual que tus hermanos?", width/2, 60);
    botonSi.display();
    botonNo.display();
  } else if (pantallaActual == 4) {
    image(img [3], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("El lobo te huele y te encuentra", width/2, 60);
    text("¿Pelear?", width/2, height/2 - 50);
    botonPelearSi.display();
  } else if (pantallaActual == 5) {
    image(img [4], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("Final1: No pudiste hacer nada y el lobo te deboró.", width/2, 60);
    botonVolver.display(); // Muestra el botón de "Volver" en la pantalla 5
  } else if (pantallaActual == 6) {
    image(img [5], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("¿De qué material quieres construir la casa?", width/2, 60);
    botonOpcion1.display();
    botonOpcion2.display();
  } else if (pantallaActual == 7) {
    image(img [6], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("Final2: El lobo llegó pero no pudo derribar tu casa!", width/2, 60);
    botonNormal.display();
  } else if (pantallaActual == 8) {
    image(img [7], 0, 0, width, height);
    textAlign(CENTER, CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("El lobo llega sopla y sopla y  derriba tu casa, \n ¿Que quieres hacer?", width/2, 60);
    botonNormal2.display();
    segundoBoton.display();
  } else if (pantallaActual == 9) {
    image(img [8], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("Corres y te refugias en la casa de ladrillos \n de tu hermano", width/2, 60);
    botonSiguiente9.display();
  } else if (pantallaActual == 10) {
    image(img [9], 0, 0, width, height);
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 60);
    fill(0);
    text("Final3:Felicitaciones!! el lobo no pudo derribar la casa \n y viven felices para siempre", width/2, 60);
    botonSiguiente10.display();
  } else if (pantallaActual == 11) {
    image(img [10], 0, 0, width, height); // Muestra el fondo de la pantalla de créditos
    textAlign(CENTER);
    fill(255);
    rect(50, 30, width - 100, 200);
    fill(0);
    text("Créditos:", width/2, 80);
    text("Cuento:Los 3 cerditos. Anonimo", width/2, 120);
    text("Nombre del Alumno: Dante Savinelli 92828/5", width/2, 160);
    botonVolverCreditos.display(); // Muestra el botón de "Volver" en la pantalla de créditos
  }
}

void mousePressed() {
  if (pantallaActual == 1 && botonIniciar.isClicked()) {
    pantallaActual = 2;
  }
  
  if (pantallaActual == 2 && botonSiguiente.isClicked()) {
    pantallaActual = 3;
  }
  
  if (pantallaActual == 3) {
    if (botonSi.isClicked()) {
      pantallaActual = 6;
    } else if (botonNo.isClicked()) {
      pantallaActual = 4;
    }
  }
  
  if (pantallaActual == 4) {
    if (botonPelearSi.isClicked()) {
      pantallaActual = 5;
    }
  }
  
  if (pantallaActual == 6) {
    if (botonOpcion1.isClicked()) {
      pantallaActual = 7;
    } else if (botonOpcion2.isClicked()) {
      pantallaActual = 8;
    }
  }
  
  if ((pantallaActual == 7 && botonNormal.isClicked())) {
    pantallaActual = 2;
  }
  
  if (pantallaActual == 8 && segundoBoton.isClicked()) {
    pantallaActual = 9;
  }
    if (pantallaActual == 8 && botonNormal2.isClicked()) {
    pantallaActual = 5;
  }
  
  if (pantallaActual == 9 && botonSiguiente9.isClicked()) {
    pantallaActual = 10;
  }
  
  if (pantallaActual == 10 && botonSiguiente10.isClicked()) {
    pantallaActual = 1;
  }
  
  if (pantallaActual == 1 && botonCreditos.isClicked()) {
    pantallaActual = 11;
  }
  
  if (pantallaActual == 5 && botonVolver.isClicked()) {
    pantallaActual = 1;
  }
  
  if (pantallaActual == 11 && botonVolverCreditos.isClicked()) {
    pantallaActual = 1;
  }
}

class Button {
  float x, y;
  float width, height;
  String label;
  
  Button(float x, float y, float width, float height, String label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.label = label;
  }
  
  void display() {
    stroke(255, 192, 203);
    fill(255, 192, 203);
    rect(x, y, width, height);
    textAlign(CENTER, CENTER);
    textFont(fuente);
    fill(0);
    text(label, x + width/2, y + height/2);
  }
  
  boolean isClicked() {
    if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
      return true;
    }
    return false;
  }
}
