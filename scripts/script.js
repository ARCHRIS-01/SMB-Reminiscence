// Arrays where we will store the images to be displayed
let imagenes = [];

// Array where we will store the selected images for the game
let selecciones = [];

// Global variables to keep the score updated and track the number of attempts
let puntos = 0;
let intentos = 0;
let vidas = document.getElementById("vidas");
const resultTextarea = document.getElementById("result");
const tryTextarea = document.getElementById("try");

// Generate the board
generarTablero();

function cargarImagenes() 
{
    // Images stored in an array
    imagenes = 
    [
        '<img src="img/1.png">',
        '<img src="img/2.png">',
        '<img src="img/3.png">',
        '<img src="img/4.png">',
        '<img src="img/5.png">',
        '<img src="img/6.png">',
    ];
}

// Function that generates the board
function generarTablero() 
{
    // First, the images are loaded
    cargarImagenes();

    // Board ID
    let tablero = document.getElementById("tablero");

    // Maximum image length
    let len = imagenes.length;

    // Where the selected images are stored
    selecciones = [];
    
    // Cards where each image goes
    let tarjetas = [];
    
    // Cards are generated dynamically
    for (let i = 0; i < len * 2; i++) 
    {
        tarjetas.push
        (`
            <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
                <div class="tarjeta" id="tarjeta${i}">
                    <div class="cara trasera" id="trasera${i}">
                        ${imagenes[0]}
                    </div>
                    <div class="cara superior"></div>
                </div>
            </div>        
        `);

        if (i % 2 == 1) 
        {
            // Remove the used image after duplicating it
            imagenes.splice(0, 1);
        }
    }

    tarjetas.sort(() => Math.random() - 0.25);
    tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) 
{
    // Id of the specific card
    let tarjeta = document.getElementById("tarjeta" + i);

    // If the card hasn't been flipped
    if (tarjeta.style.transform != "rotateY(180deg)") 
    {
        // Flip it and add it to the selected cards array
        tarjeta.style.transform = "rotateY(180deg)";
        selecciones.push(i);
    }

    // If more than 2 cards have been selected
    if (selecciones.length == 2) 
    {
        // Flip the cards back to their original position
        deseleccionar(selecciones);
        selecciones = []; // Clear the array
    }
}

function deseleccionar(selecciones) 
{
    setTimeout(() => 
    {
        let trasera1 = document.getElementById("trasera" + selecciones[0]);
        let trasera2 = document.getElementById("trasera" + selecciones[1]);

        if (trasera1.innerHTML != trasera2.innerHTML) 
        {
            // Card movement
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
            tarjeta1.style.transform = "rotateY(0deg)";
            tarjeta2.style.transform = "rotateY(0deg)";

            // Score and animation
            showMarioCoinAndUpdateScore("champiVenenoso", 2);

            // Number of attempts
            intentosF();
        }
        else
        {
            // Correct pair of cards
            trasera1.style.background = "lightgreen";
            trasera2.style.background = "lightgreen";

            // Score and animation
            showMarioCoinAndUpdateScore("marioCoin", 1);

            // Number of attempts
            intentosF();
        }

    }, 1000);
}

// Animation for the coins/poisonous mushroom
function showMarioCoinAndUpdateScore(elemento, op) 
{
    const marioCoin = document.getElementById(elemento);
    marioCoin.style.display = "block";

    puntuacion(op);
  
    // Hide the coin after 1 second
    setTimeout(() => 
    {
        marioCoin.style.display = "none";
    }, 1000);
}

// Increase number of attempts
function intentosF()
{
    intentos += 1;

    // Update the number of attempts in the HTML
    tryTextarea.value = intentos;

    // Update the number of attempts in the top of the screen
    vidas.innerHTML = 'x' + intentos;
}

// Increase or decrease score
function puntuacion(op)
{
    if (op == 1){puntos += 200;}
    else {puntos -= 200;}

    // Update the score
    resultTextarea.value = puntos;
}

// Reset the score and attempt variables to 0
addEventListener("DOMContentLoaded", () => {
    resultTextarea.value = 0;
    tryTextarea.value = 0;
});