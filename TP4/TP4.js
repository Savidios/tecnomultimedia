//VIDEO: https://www.youtube.com/watch?v=vZjr-4jirZ4
// Define el laberinto con las paredes y pasillos
const laberinto = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W0          WWW          0W",
  "W W WWWWWWW WWW WWWWWWW WGW",
  "W W          0          W W",
  "W W WWW WWWW W WWWW WWW W W",
  "W W          W          W W",
  "W WWWWW WWWW W WWWW WWWWW W",
  "W       W    W    W       W",
  "W WWWWW W WWWWW W W WWWWW W",
  "W       W W  0  W W       W",
  "WWWWW W W W WWWWW W W WWWWW",
  "WWWWW W W         W W WWWWW",
  "WWWWW W W WWWWWWW W W WWWWW",
  "HHHHH                 HHHHH",
  "WWWWW W W WWWWWWW W W WWWWW",
  "WWWWW W W  P   P  W W WWWWW",
  "WWWWW W W WWWWWWW W W WWWWW",
  "W       W    W    W       W",
  "WGWWWWW W WW W WW W WWWWW W",
  "W0                       0W",
  "W WWWWW W W W WWWWW W W W W",
  "W W   W W W W W   W W W W W",
  "W W W W W W W W W W W W W W",
  "W W W W W   W W W W W G W W",
  "W W W W WWWWW W W W WWWWW W",
  "W            0            W",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWW"
];
let colisionesConFantasmasNormales = 0;

// En la parte superior del código, agrega una variable para rastrear si el juego está en pausa.
let juegoEnPausa = false;
// Tamaño de cada celda en el laberinto
const TamañoDeCelda = 20;
// Tamaño de Pac-Man
const tamañoPacMan = TamañoDeCelda * 1;
// Tamaño de las imágenes de los fantasmas
const tamañoDeImagen = TamañoDeCelda * 1;
// Tamaño de las Power Pellets
const tamañoPowerPellet = TamañoDeCelda * 0.5;
// Posición inicial de Pac-Man
let pacManX;
let pacManY;
// Dirección actual de Pac-Man (0: derecha, 1: abajo, 2: izquierda, 3: arriba)
let direccionPacMan = 0;
// Velocidad de movimiento de Pac-Man
const velocidadPacMan = 1.5;
// Velocidad de movimiento de los fantasmas
let velocidadFantasmas = 1;
// Intervalo para abrir y cerrar la boca de Pac-Man (1 segundo)
const intervaloMouth = 500; // en milisegundos
let bocaAbierta = true;
// Variables para controlar la apertura de la boca hacia arriba y abajo
let bocaArriba = false;
let bocaAbajo = false;
// Matriz para representar los Pac-Dots en el laberinto
const pacDots = [];
// Matriz para representar la ubicación original de las Power Pellets
const powerPelletsOriginales = [
  "WWWWWWWWWWWWWWWWWWWWWWWWWWW",
  "W0          WWW          0W",
  "W W WWWWWWW WWW WWWWWWW W W",
  "W W          0          W W",
  "W W WWW WWWW W WWWW WWW W W",
  "W W          W          W W",
  "W WWWWW WWWW W WWWW WWWWW W",
  "W       W    W    W       W",
  "W WWWWW W WWWWW W W WWWWW W",
  "WG      W W  0  W W       W",
  "WWWWW W W W WWWWW W W WWWWW",
  "WWWWW W W         W W WWWWW",
  "WWWWW W W WWWWWWW W W WWWWW",
  "HHHHH                 HHHHH",
  "WWWWW W W WWWWWWW W W WWWWW",
  "WWWWW W W  P   P  W WGWWWWW",
  "WWWWW W W WWWWWWW W W WWWWW",
  "W       W    W    W       W",
  "W WWWWW W WW W WW W WWWWW W",
  "W0                       0W",
  "W WWWWW W W W WWWWW W W W W",
  "W W   W W W W W   W W W W W",
  "W W W W W W W W W W W W W W",
  "W W W W W   W W W W W   W W",
  "W WGW W WWWWW W W W WWWWW W",
  "W            0            W",
  "WWWWWWWWWWWWWWWWWWWWWWWWWWW"
];
let tiempoFantasmasRapidos = 400; // Tiempo en segundos que los fantasmas se moverán más rápido
// Contador de puntos
let contadorPuntos = 0;
// Variables para representar los fantasmas como objetos
class Fantasma {
  constructor(x, y, imagen) {
    this.x = x;
    this.y = y;
    this.imagen = imagen;
    this.direccion = { x: 1, y: 0 }; // Inicialmente, el fantasma se mueve hacia la derecha
  }
}
// Define las nuevas imágenes de los fantasmas miedosos
let imagenMiedoso1;
let imagenMiedoso2;
let imagenMiedoso3;
let imagenMiedoso4;
// Arreglo para almacenar los fantasmas
let fantasmas = [];
let posicionesFantasmas = [];
// Variable para almacenar las posiciones de los fantasmas miedosos cuando se activa la Power Pellet
let posicionesFantasmasMiedosos = [];
const posicionesInicialesFantasmas = [];
// Variable para controlar si los fantasmas miedosos están activos
let fantasmasMiedososActivos = false;
// Contador de tiempo para las Power Pellets
let contadorTiempo = 0;
function preload() {
  // Cargar imágenes de los fantasmas
  imagenFantasma1 = loadImage('1.png');
  imagenFantasma2 = loadImage('2.png');
  imagenFantasma3 = loadImage('3.png');
  imagenFantasma4 = loadImage('4.png');
  // Cargar imágenes de los fantasmas miedosos
  imagenMiedoso1 = loadImage('miedoso1.png');
  imagenMiedoso2 = loadImage('miedoso2.png');
  imagenMiedoso3 = loadImage('miedoso3.png');
  imagenMiedoso4 = loadImage('miedoso4.png');
}
function setup() {
  createCanvas(laberinto[0].length * TamañoDeCelda, laberinto.length * TamañoDeCelda);
  pacManX = TamañoDeCelda * 1.5;
  pacManY = TamañoDeCelda * 1.5;
  generarPacDots(); // Generar Pac-Dots en el laberinto

 // Almacenar las posiciones iniciales de los fantasmas
  for (let i = 0; i < fantasmas.length; i++) {
    posicionesInicialesFantasmas.push({ x: fantasmas[i].x, y: fantasmas[i].y });
  }
  // Calcular la posición del centro del mapa
  const centroX = laberinto[0].length * TamañoDeCelda / 2;
  const centroY = laberinto.length * TamañoDeCelda / 2.06;

// Calcular las posiciones de los fantasmas en el centro del mapa
const distanciaEntreFantasmas = tamañoDeImagen * 1.5; // Espacio entre los fantasmas
fantasmas.push(new Fantasma(centroX - distanciaEntreFantasmas * 1.5, centroY, imagenFantasma1));
fantasmas.push(new Fantasma(centroX - distanciaEntreFantasmas * 0.5, centroY, imagenFantasma2));
fantasmas.push(new Fantasma(centroX + distanciaEntreFantasmas * 0.5, centroY, imagenFantasma3));
fantasmas.push(new Fantasma(centroX + distanciaEntreFantasmas * 1.5, centroY, imagenFantasma4));

// Guardar las imágenes originales de los fantasmas
const imagenesOriginalesFantasmas = [
  imagenFantasma1,
  imagenFantasma2,
  imagenFantasma3,
  imagenFantasma4
];

  setInterval(cambiarBoca, intervaloMouth);
  noLoop();
}

function draw() {
  background(0);
  noStroke();

if (juegoEnPausa) {
    // El juego está en pausa, así que no actualices nada.
    return;
  }
// dibuja el laberinto 
  for (let y = 0; y < laberinto.length; y++) {
    for (let x = 0; x < laberinto[y].length; x++) {
      const celda = laberinto[y][x];
      if (celda === "W") {
        fill(0, 0, 128); // Paredes azules oscuro
        rect(x * TamañoDeCelda, y * TamañoDeCelda, TamañoDeCelda, TamañoDeCelda);
      }
    }
  }

// Dibujar Power Pellets y actualizar su estado
fill(255, 204, 0); // Dorado para Power Pellets
for (let y = 0; y < laberinto.length; y++) {
  for (let x = 0; x < laberinto[y].length; x++) {
    if (laberinto[y][x] === "G") {
      const centerX = x * TamañoDeCelda + TamañoDeCelda / 2;
      const centerY = y * TamañoDeCelda + TamañoDeCelda / 2;
      ellipse(centerX, centerY, tamañoPowerPellet);
      
// Verificar si Pac-Man come una Power Pellet
const distanciaPacman = dist(pacManX, pacManY, centerX, centerY);
if (distanciaPacman < tamañoPacMan / 2 + tamañoPowerPellet / 2) {
  recogerPowerPellet(centerX, centerY); // Llamar a la función para recoger la Power Pellet
}
    }
  }
}

  // Dibujar Pac-Dots
  fill(255, 204, 0); // Dorado
  for (let y = 0; y < pacDots.length; y++) {
    for (let x = 0; x < pacDots[y].length; x++) {
      if (pacDots[y][x] === 1) {
        const centerX = x * TamañoDeCelda + TamañoDeCelda / 2;
        const centerY = y * TamañoDeCelda + TamañoDeCelda / 2;
        ellipse(centerX, centerY, TamañoDeCelda * 0.2);
      }
    }
  }

  // Dibujar a Pac-Man
  fill(255, 210, 0); // Amarillo
  if (bocaAbierta) {
    if (direccionPacMan === 0) {
      arc(pacManX, pacManY, tamañoPacMan, tamañoPacMan, radians(45), radians(315), PIE);
    } else if (direccionPacMan === 2) {
      arc(pacManX, pacManY, tamañoPacMan, tamañoPacMan, radians(225), radians(135), PIE);
    } else if (bocaArriba) {
      arc(pacManX, pacManY, tamañoPacMan, tamañoPacMan, -PI / 2 - radians(-60), -PI / 2 + radians(-60), PIE);
    } else if (bocaAbajo) {
      arc(pacManX, pacManY, tamañoPacMan, tamañoPacMan, PI / 2 - radians(-50), PI / 2 + radians(-50), PIE);
    } else {
      ellipse(pacManX, pacManY, tamañoPacMan);
    }
  } else {
    ellipse(pacManX, pacManY, tamañoPacMan);
  }

// Dibujar a los fantasmas
for (let i = 0; i < fantasmas.length; i++) {
  const fantasma = fantasmas[i];
  moverFantasma(fantasma);
  image(fantasma.imagen, fantasma.x, fantasma.y, tamañoDeImagen, tamañoDeImagen);
}

// Mostrar las posiciones de los fantasmas antes de consumir la Power Pellet
if (posicionesFantasmas.length > 0) {
  fill(255);
  textSize(16);
  text("Posiciones de los fantasmas antes de la Power Pellet:", 20, height - 40);
  for (let i = 0; i < posicionesFantasmas.length; i++) {
    const pos = posicionesFantasmas[i];
    text(`Fantasma ${i + 1}: X = ${pos.x}, Y = ${pos.y}`, 20, height - 20 - i * 20);
  }
}


  // Mostrar contador de puntos
  fill(255);
  textSize(24);
  text(`Puntos: ${contadorPuntos}`, 20, 19);

  // Mostrar contador de tiempo de las Power Pellets
  fill(255);
  textSize(16);
  text(`Tiempo: ${contadorTiempo} s`, width - 120, 19);

  // Actualizar el tiempo de las Power Pellets
  if (contadorTiempo > 0) {
  contadorTiempo--;
  if (contadorTiempo === 0) {
    velocidadFantasmas = 1; // Restaurar la velocidad normal de los fantasmas
  } else {
    velocidadFantasmas = 1.4; // Aumentar la velocidad de los fantasmas durante el tiempo especificado
  }
}
   // Verificar si el contador de tiempo ha llegado a 1 y los fantasmas miedosos están activos
  if (contadorTiempo === 0 && fantasmasMiedososActivos) {
    // Restaurar las posiciones de los fantasmas originales usando las posiciones de los miedosos
    for (let i = 0; i < fantasmas.length; i++) {
      fantasmas[i].x = posicionesFantasmasMiedosos[i].x;
      fantasmas[i].y = posicionesFantasmasMiedosos[i].y;
    }

    // Reemplazar las imágenes de los fantasmas miedosos por las imágenes originales
    for (let i = 0; i < fantasmas.length; i++) {
      fantasmas[i].imagen = eval(`imagenFantasma${i + 1}`);
    }

    // Restaurar la velocidad normal de los fantasmas
    velocidadFantasmas = 1;
    fantasmasMiedososActivos = false;
  }
}
// Generar Pac-Dots en el laberinto
function generarPacDots() {
  for (let y = 0; y < laberinto.length; y++) {
    pacDots[y] = [];
    for (let x = 0; x < laberinto[y].length; x++) {
      pacDots[y][x] = (laberinto[y][x] === "0" || laberinto[y][x] === " ") ? 1 : 0; // 1 representa un Pac-Dot, 0 representa vacío
    }
  }
}

// Cambiar el estado de la boca de Pac-Man
function cambiarBoca() {
  bocaAbierta = !bocaAbierta;
  redraw();
}

// Controlar el movimiento de Pac-Man con las teclas
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direccionPacMan = 2;
    bocaArriba = false;
    bocaAbajo = false;
  } else if (keyCode === RIGHT_ARROW) {
    direccionPacMan = 0;
    bocaArriba = false;
    bocaAbajo = false;
  } else if (keyCode === UP_ARROW) {
    direccionPacMan = 3;
    bocaArriba = true;
    bocaAbajo = false;
  } else if (keyCode === DOWN_ARROW) {
    direccionPacMan = 1;
    bocaArriba = false;
    bocaAbajo = true;
  }
}

// Actualizar la posición de Pac-Man
function actualizarPacMan() {
  const dx = (direccionPacMan === 0) ? velocidadPacMan : (direccionPacMan === 2) ? -velocidadPacMan : 0;
  const dy = (direccionPacMan === 1) ? velocidadPacMan : (direccionPacMan === 3) ? -velocidadPacMan : 0;

  const siguienteX = pacManX + dx;
  const siguienteY = pacManY + dy;

  // Verificar si el movimiento es válido antes de actualizar la posición
  if (esMovimientoValido(siguienteX - tamañoPacMan / 4, siguienteY) &&
    esMovimientoValido(siguienteX + tamañoPacMan / 4, siguienteY) &&
    esMovimientoValido(siguienteX, siguienteY - tamañoPacMan / 4) &&
    esMovimientoValido(siguienteX, siguienteY + tamañoPacMan / 4)) {
    pacManX = siguienteX;
    pacManY = siguienteY;
    recogerPacDot(siguienteX, siguienteY);
  }

  // Redibujar la pantalla con la nueva posición
  redraw();
}

// Verificar si el movimiento es válido (no es una pared)
function esMovimientoValido(x, y) {
  const columna = floor(x / TamañoDeCelda);
  const fila = floor(y / TamañoDeCelda);

  if (fila >= 0 && fila < laberinto.length && columna >= 0 && columna < laberinto[0].length) {
    return laberinto[fila][columna] !== "W";
  }

  return false;
}

// Verificar si el movimiento de los fantasmas es válido
function esMovimientoValidoFantasmas(x, y) {
  const columna = floor(x / TamañoDeCelda);
  const fila = floor(y / TamañoDeCelda);

  if (fila >= 0 && fila < laberinto.length && columna >= 0 && columna < laberinto[0].length) {
    return laberinto[fila][columna] !== "W";
  }

  return false;
}

// Recoger un Pac-Dot en la posición especificada
function recogerPacDot(x, y) {
  const columna = floor(x / TamañoDeCelda);
  const fila = floor(y / TamañoDeCelda);

  if (fila >= 0 && fila < pacDots.length && columna >= 0 && columna < pacDots[0].length) {
    if (pacDots[fila][columna] === 1) {
      pacDots[fila][columna] = 0; // Marcar el Pac-Dot como recogido
      contadorPuntos++; // Aumentar el contador de puntos
      
      // Verificar si se han recogido todos los Pac-Dots
      const totalPacDots = pacDots.reduce((total, fila) => total + fila.reduce((subTotal, valor) => subTotal + valor, 0), 0);
      if (totalPacDots === 0) {
  // Todos los Pac-Dots han sido recogidos, pausa el juego y luego reinícialo después de 2000 milisegundos.
  juegoEnPausa = true;
  contadorTiempo = 2000 / 1000; // 2000 milisegundos = 2 segundos
  reiniciarJuego(); // Llama a reiniciarJuego inmediatamente
}
    }
  }
}

function recogerPowerPellet(x, y) {
  const columna = floor(x / TamañoDeCelda);
  const fila = floor(y / TamañoDeCelda);

  if (fila >= 0 && fila < laberinto.length && columna >= 0 && columna < laberinto[0].length) {
    if (laberinto[fila][columna] === "G") {
      // Eliminar la Power Pellet del laberinto
      laberinto[fila] = laberinto[fila].substring(0, columna) + " " + laberinto[fila].substring(columna + 1);

      // Cambiar las imágenes de los fantasmas a las imágenes miedosas
      for (let i = 0; i < fantasmas.length; i++) {
        fantasmas[i].imagen = eval(`imagenMiedoso${i + 1}`);
      }

      // Guardar las posiciones actuales de los fantasmas miedosos
      posicionesFantasmasMiedosos = [];
      for (let i = 0; i < fantasmas.length; i++) {
        posicionesFantasmasMiedosos.push({ x: fantasmas[i].x, y: fantasmas[i].y });
      }

      contadorTiempo = tiempoFantasmasRapidos;
      velocidadFantasmas = 2; // Aumentar la velocidad de los fantasmas
      fantasmasMiedososActivos = true;
    }
  }
}


function reiniciarPowerPellets() {
  for (let y = 0; y < laberinto.length; y++) {
    for (let x = 0; x < laberinto[y].length; x++) {
      if (powerPelletsOriginales[y][x] === "G") {
        // Restaurar una Power Pellet en su lugar original
        laberinto[y] = laberinto[y].substring(0, x) + "G" + laberinto[y].substring(x + 1);
      }
    }
  }
}


function moverFantasma(fantasma) {
  // Verificar si es necesario cambiar la dirección aleatoriamente
  if (random() < 0.02) { // Probabilidad de cambio de dirección (ajústala según tu preferencia)
    const direccionesPosibles = obtenerDireccionesPosibles(fantasma);
    const nuevaDireccion = direccionesPosibles[Math.floor(Math.random() * direccionesPosibles.length)];
    fantasma.direccion = nuevaDireccion;
  }

  // Calcular la próxima posición del fantasma
  const nuevaX = fantasma.x + fantasma.direccion.x * velocidadFantasmas;
  const nuevaY = fantasma.y + fantasma.direccion.y * velocidadFantasmas;

  // Verificar si el movimiento es válido antes de actualizar la posición del fantasma
  if (esMovimientoValidoFantasmas(nuevaX, nuevaY)) {
    fantasma.x = nuevaX;
    fantasma.y = nuevaY;
  }
}

// Obtener direcciones posibles para un fantasma
function obtenerDireccionesPosibles(fantasma) {
  const direccionesPosibles = [];
  const posiblesDirecciones = [
    { x: 1, y: 0 },  // Derecha
    { x: -1, y: 0 }, // Izquierda
    { x: 0, y: 1 },  // Abajo
    { x: 0, y: -1 }  // Arriba
  ];

  for (const direccion of posiblesDirecciones) {
    const nuevaX = fantasma.x + direccion.x * velocidadFantasmas;
    const nuevaY = fantasma.y + direccion.y * velocidadFantasmas;

    if (esMovimientoValidoFantasmas(nuevaX, nuevaY)) {
      direccionesPosibles.push(direccion);
    }
  }

  return direccionesPosibles;
}

function reiniciarFantasmas() {
  // Calcular la posición del centro del mapa
  const centroX = laberinto[0].length * TamañoDeCelda / 2;
  const centroY = laberinto.length * TamañoDeCelda / 2.06;

  // Calcular las posiciones de los fantasmas en el centro del mapa
  const distanciaEntreFantasmas = tamañoDeImagen * 1.5; // Espacio entre los fantasmas
  fantasmas[0].x = centroX - distanciaEntreFantasmas * 1.5;
  fantasmas[0].y = centroY;
  fantasmas[1].x = centroX - distanciaEntreFantasmas * 0.5;
  fantasmas[1].y = centroY;
  fantasmas[2].x = centroX + distanciaEntreFantasmas * 0.5;
  fantasmas[2].y = centroY;
  fantasmas[3].x = centroX + distanciaEntreFantasmas * 1.5;
  fantasmas[3].y = centroY;
}


//función para reiniciar el juego.
function reiniciarJuego() {
  // Reiniciar todos los valores necesarios
  pacManX = TamañoDeCelda * 1.5;
  pacManY = TamañoDeCelda * 1.5;
  direccionPacMan = 0;
  generarPacDots();
  reiniciarPowerPellets();
  reiniciarFantasmas();  
  juegoEnPausa = false; // Reanudar el juego.
  redraw(); // Redibujar la pantalla.
}
function reiniciarJuegoPerdido() {
  // Restaurar todos los valores necesarios
  pacManX = TamañoDeCelda * 1.5;
  pacManY = TamañoDeCelda * 1.5;
  direccionPacMan = 0;
  reiniciarFantasmas();
  juegoEnPausa = false; // Reanudar el juego.
  //colisionesConFantasmasNormales = 0; // Restablecer el contador de colisiones
  redraw(); // Redibujar la pantalla.
}
function verificarColisionConFantasmas() {
  for (let i = 0; i < fantasmas.length; i++) {
    const fantasma = fantasmas[i];
    const distancia = dist(pacManX, pacManY, fantasma.x, fantasma.y);
    if (distancia < tamañoPacMan / 2 + tamañoDeImagen / 2) {
      if (fantasmasMiedososActivos) {
        // Pac-Man colisiona con un fantasma miedoso, eliminar al fantasma
        fantasmas.splice(i, 1);
        i--;
        // Verificar si se han eliminado todos los fantasmas
        if (fantasmas.length === 0) {
          // Todos los fantasmas han sido eliminados, restaurarlos en sus posiciones iniciales y con sus imágenes originales
          for (let j = 0; j < posicionesInicialesFantasmas.length; j++) {
            const posicionInicial = posicionesInicialesFantasmas[j];
            const imagenOriginal = imagenesOriginalesFantasmas[j];
            fantasmas.push(new Fantasma(posicionInicial.x, posicionInicial.y, imagenOriginal));
          }
          velocidadFantasmas = 1; // Restaurar la velocidad normal de los fantasmas
          fantasmasMiedososActivos = false;
        }
      } else {
        // Pac-Man colisiona con un fantasma original
        colisionesConFantasmasNormales++;
        if (colisionesConFantasmasNormales >= 3) {
          // El juego se termina después de 3 colisiones con fantasmas normales
          juegoEnPausa = true;
          mostrarGameOver();
        } else {
          reiniciarJuegoPerdido(); // Reiniciar el juego después de una colisión
        }
      }
    }
  }
}
function mostrarGameOver() {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
}


// Llamar a la función para verificar la colisión de Pac-Man con los fantasmas a intervalos regulares
setInterval(verificarColisionConFantasmas, 1000 / 10); // Verificar cada décima de segundo



// Llamar a la función para actualizar la posición de Pac-Man a intervalos regulares
setInterval(actualizarPacMan, 1000 / 60); // Actualizar 60 veces por segundo
