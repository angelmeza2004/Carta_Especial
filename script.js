/* ==========================================
   CARTA PARA CARMEN
   Control de interacciones y animaciones
   ========================================== */

const experience = document.getElementById("experience");

const envelope = document.getElementById("envelope");

const openText = document.getElementById("openText");

const closeButton = document.getElementById("closeButton");

const letterCard = document.getElementById("letterCard");

const readingScene = document.getElementById("readingScene");

const floatingHearts = document.getElementById("floatingHearts");

const petals = document.getElementById("petals");


let currentState = "closed";

let openingTimer = null;
let closingTimer = null;


/* ==========================================
   1. GENERAR CORAZONES FLOTANTES
   ========================================== */

function createFloatingHearts() {

  const symbols = ["♡", "♥", "❤"];

  for (let i = 0; i < 12; i++) {

    const heart = document.createElement("span");

    heart.classList.add("floating-heart");

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize =
      (12 + Math.random() * 15) + "px";

    heart.style.animationDuration =
      (8 + Math.random() * 9) + "s";

    heart.style.animationDelay =
      (Math.random() * 12) + "s";

    floatingHearts.appendChild(heart);

  }

}


/* ==========================================
   2. GENERAR PÉTALOS
   ========================================== */

function createPetals() {

  for (let i = 0; i < 13; i++) {

    const petal = document.createElement("span");

    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "%";

    petal.style.animationDuration =
      (7 + Math.random() * 9) + "s";

    petal.style.animationDelay =
      (Math.random() * 10) + "s";

    petal.style.opacity =
      (0.25 + Math.random() * 0.4);

    petals.appendChild(petal);

  }

}


/* ==========================================
   3. ABRIR LA CARTA
   ========================================== */

function openLetter() {

  if (currentState !== "closed") {
    return;
  }

  currentState = "opening";

  clearTimeout(openingTimer);
  clearTimeout(closingTimer);

  // Desactivar los controles durante la apertura.
  envelope.disabled = true;
  openText.disabled = true;

  // Activar la animación de apertura.
  experience.classList.add("is-opening");

  envelope.setAttribute("aria-expanded", "true");

  /*
    La carta comienza a salir del sobre.
    Después se traslada a la escena de lectura.
  */

  openingTimer = window.setTimeout(() => {

    if (currentState !== "opening") {
      return;
    }

    // Mover la carta a su contenedor definitivo.
    readingScene.appendChild(letterCard);

    // Mostrar la escena de lectura.
    experience.classList.add("is-reading");

    readingScene.setAttribute("aria-hidden", "false");

    readingScene.removeAttribute("inert");

    currentState = "reading";

    closeButton.focus({ preventScroll: true });

  }, 1500);

}


/* ==========================================
   4. CERRAR LA CARTA
   ========================================== */

function closeLetter() {

  if (
    currentState !== "reading" &&
    currentState !== "opening"
  ) {
    return;
  }

  clearTimeout(openingTimer);
  clearTimeout(closingTimer);

  currentState = "closing";

  // Ocultar la escena de lectura.
  experience.classList.remove("is-reading");

  readingScene.setAttribute("aria-hidden", "true");

  readingScene.setAttribute("inert", "");

  /*
    Esperar a que termine la transición
    antes de devolver la carta al sobre.
  */

  closingTimer = window.setTimeout(() => {

    // Devolver la carta a su posición original.
    const leftFold =
      envelope.querySelector(".envelope-left-fold");

    envelope.insertBefore(letterCard, leftFold);

    // Restablecer el estado inicial.
    experience.classList.remove("is-opening");

    envelope.setAttribute("aria-expanded", "false");

    envelope.disabled = false;
    openText.disabled = false;

    currentState = "closed";

    openText.focus({ preventScroll: true });

  }, 650);

}


/* ==========================================
   5. EVENTOS DE INTERACCIÓN
   ========================================== */

// Pulsar el sobre.
envelope.addEventListener("click", openLetter);

// Pulsar el texto "Abre la carta".
openText.addEventListener("click", openLetter);

// Volver al sobre.
closeButton.addEventListener("click", closeLetter);


/* ==========================================
   6. TECLA ESCAPE
   ========================================== */

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    (
      currentState === "reading" ||
      currentState === "opening"
    )
  ) {

    closeLetter();

  }

});


/* ==========================================
   7. INICIALIZACIÓN
   ========================================== */

function initializeExperience() {

  createFloatingHearts();

  createPetals();

  // Estado inicial.
  currentState = "closed";

  envelope.disabled = false;
  openText.disabled = false;

  console.log(
    "Carta para Carmen inicializada correctamente."
  );

}

initializeExperience();