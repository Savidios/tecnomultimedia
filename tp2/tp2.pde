// Enlace de explicacion: https://www.youtube.com/watch?v=RMCiu5ZMDDQ
// Dante Savinelli 92828/5
PImage fotoilusion;
color lineColor = color(0); // Color inicial: negro

void setup() {
  size(800, 400);
  fotoilusion = loadImage("fotoilusion.jpeg");
}

void draw() {
  background(255);
  image(fotoilusion, 0, 0, 400, 400);
  translate(600, 200);
  
  // Coordenadas del triángulo
  float x1 = 0; // Coordenada x del vértice superior
  float y1 = -20; // Coordenada y del vértice superior
  
  float x2 = -50; // Coordenada x del vértice inferior izquierdo
  float y2 = 60; // Coordenada y del vértice inferior izquierdo
  
  float x3 = 50; // Coordenada x del vértice inferior derecho
  float y3 = 60; // Coordenada y del vértice inferior derecho
  
  // Dibujar el triángulo
  triangle(x1, y1, x2, y2, x3, y3);
  
  // Dibujar líneas en cada vértice
  stroke(lineColor); // Color negro
  strokeWeight(3); // Grosor de la línea
  
  // Coordenadas de las líneas
  float[][] lines = {
    {x1, y1, x1 - 15, y1 - 20}, // Línea en el vértice superior
    {x2, y2, x2 - 30, y2 + 40}, // Línea en el vértice inferior izquierdo
    {x3, y3, x3 + 40, y3}, // Línea en el vértice inferior derecho
    {x2 - 30, y2 + 40, 170, 100}, // Línea en el exterior de la linea inferior izquierda
    {x1 - 15, y1 - 20, -140, 140}, // Línea en el exterior de la linea superior
    {x3 + 40, y3, -10, -100}, // Línea en el exterior de la primera linea inferior derecha
    {-10, -100, -160, 110}, // Linea superior
    {-160, 110, -140, 140}, // Linea de union inferior izquierda
    {-140, 140, 140, 140}, // Linea inferior
    {140, 140, 170, 100}, // Linea de union inferior derecha
    {170, 100, 30, -105}, // Linea de la derecha
    {30, -105, -10, -100} // Linea de union superior
  };
  
  // Ciclo for para dibujar las lineas
  for (int i = 0; i < lines.length; i++) {
    float[] lineCoords = lines[i];
    line(lineCoords[0], lineCoords[1], lineCoords[2], lineCoords[3]);
  }
}

// void keypressed para animacion de teclado, donde al presionar el espacio cambian las lineas a un color aleatorio y al apretar la R vuelven los valores iniciales del color a 0.

void keyPressed() {
  eventos();
}
