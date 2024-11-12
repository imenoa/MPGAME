
function createGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

let Morpion = createGrid(3, 3);
let puissanceQ = createGrid(6, 7);


const MorpionContainer = document.querySelector(" #Morpion");
const puissanceQcontainer = document.querySelector('#puissanceQ')
const gamepiececontainer = document.querySelector("#gamepiece")
const gameModecontainer = document.querySelector("#gameMode")
const modeBtncontainer = document.querySelector("#modeBtn")
const restartbtn = document.querySelector("#restartbtn");
const resetbtncontainer = document.querySelector("#resetbtn")
const pieceBtncontainer = document.querySelector("#pieceBtn")
const gameChoieContainer = document.querySelector("#gamechoice")
const gameContainer = document.querySelector("#game")
const morpionbtn = document.querySelector(".morpionbtn")
const puissancebtn = document.querySelector(".puissancebtn")

const vsIa = createImage("../assets/image/ia.webp", 'IA', ["img-gameMode"]);
const vsplayer = createImage("../assets/image/player.webp", 'IA', ["img-gameMode"]);
const pieceOne = createImage('../assets/image/pionj.png', 'Joueur n°1', ["img-piece"]);
const pieceTwo = createImage("../assets/image/pion.png", 'Joueur n°2', ["img-piece"]);
const iaplayer = createImage("../assets/image/pionia.png", 'IA', ["imag-piece"]);
const morpion = createImage("../assets/image/morpion.webp", 'morpion', ["img-gameMode"]);
const puissance = createImage("../assets/image/pq.webp", 'puissanceQ', ["img-gameMode"]);


let playerOne = null;
let playerTwo = null;
let currentPlayer = null;

let gameMode = "";
let currentGame = "";

const msgEnd = document.querySelector("#msgEnd");
let gameEnd = false;

//----------------------------------------------------------------------------------------------------------Choix Pion

function startMorpion(){
  hideEndMessage() 
  currentGame = 'Morpion';
  msgEnd.textContent = "";
SelectgameMode();
}

function startPuissance(){
  hideEndMessage() 
  currentGame = 'PuissanceQ';
  msgEnd.textContent = "";
SelectgameMode();
}


function chooseGame(){
  hideEndMessage() 
  morpionbtn.style.display = "none";
  puissancebtn.style.display = "none";
  gameContainer.style.display = "flex";
  puissanceQcontainer.style.display = "none";
  MorpionContainer.style.display = "none";
  resetbtncontainer.style.display = "none";
  restartbtn.style.display = "none"
  gameModecontainer.style.display = 'none';
  gamepiececontainer.style.display = 'none';
  modeBtncontainer.textContent = ""
  msgEnd.textContent = "";


gameChoieContainer.appendChild(morpion)
morpion.addEventListener("click", () => {
currentGame = 'Morpion';

SelectgameMode();
})

  gameChoieContainer.appendChild(puissance)
  puissance.addEventListener("click", () => {
  currentGame = 'PuissanceQ';
 
  SelectgameMode();
})

gameChoieContainer.appendChild(puissance)
}
chooseGame()

function SelectgameMode() {
  gameContainer.style.display = "none";
  puissanceQcontainer.style.display = "none";
  MorpionContainer.style.display = "none";
  resetbtncontainer.style.display = "none";
  restartbtn.style.display = "none"
  gameModecontainer.style.display = 'flex';
  morpionbtn.style.display = "flex";
  puissancebtn.style.display = "flex";
  gamepiececontainer.style.display = 'none';
  modeBtncontainer.textContent = ""

  modeBtncontainer.appendChild(vsIa);
  vsIa.addEventListener("click", () => {
    gameMode = "vsIa";
    ChoosePiece()
  });


  modeBtncontainer.appendChild(vsplayer);
  vsplayer.addEventListener("click", () => {
    gameMode = "vsPlayer";
    ChoosePiece()
  });
  gameEnd = false
}



function ChoosePiece() {

  gameModecontainer.style.display = 'none';
  gamepiececontainer.style.display = 'flex';
  pieceBtncontainer.textContent = ""

  pieceBtncontainer.appendChild(pieceOne);
  pieceOne.addEventListener("click", () => {

    playerOne = pieceOne;
    playerTwo = gameMode === "vsIa" ? iaplayer : pieceTwo;
    currentPlayer = playerOne

    resetbtncontainer.style.display = "none";
    restartbtn.style.display = "none"

    StartGame()

  });

  pieceBtncontainer.appendChild(pieceTwo);
  pieceTwo.addEventListener("click", () => {

    playerOne = pieceTwo;
    playerTwo = gameMode === "vsIa" ? iaplayer : pieceOne;
    currentPlayer = playerOne

    MorpionContainer.style.display = "none";
    resetbtncontainer.style.display = "none";
    restartbtn.style.display = "none"

    StartGame()

  });

  gameEnd = false //relance mon jeu après restart or reset

}


function StartGame() {
  ResetGame();

  gamepiececontainer.style.display = 'none'
  gameModecontainer.style.display = "none";
  resetbtncontainer.style.display = "flex";
  restartbtn.style.display = "flex"

  if (currentGame === 'Morpion') {
    MorpionContainer.style.display = "flex";

    displayMorpion();
    resetMorpion()

  } else if (currentGame === 'PuissanceQ') {
    puissanceQcontainer.style.display = "grid";

    displayPQ();
    resetPQ();

  }

  restartButton()
  ResetGame();


}

//////////////////////////////////  MORPION  ////////////////////////////////

function displayMorpion() {

  displayGrid(Morpion, MorpionContainer, "cell", MakeMoveMorpion);

}

function MakeMoveMorpion(i, j) {
  if (gameEnd || Morpion[i][j] !== null) return;

  Morpion[i][j] = currentPlayer;
  displayMorpion();

  if (checkGameEnd(Morpion, 3))
    return;
  switchPlayer();
  playAI(Morpion, displayMorpion, 3);
}

function aiMorpion() {
  if (gameEnd) return;

  let emptyCells = [];

  Morpion.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) emptyCells.push({ i, j });
    });
  });

  if (emptyCells.length > 0) {
    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    Morpion[i][j] = iaplayer;
    displayMorpion();

    if (checkWin(Morpion, 3)) {
      showEndMessage (iaplayer.alt + "a gagné!");
      gameEnd = true;
      resetMorpion()
    } else {
      currentPlayer = playerOne;
      toggleClicks(true);
    }
  }
}

//////////////////////////////////  PUISSANCE4    ////////////////////////////////

function displayPQ() {
  displayGrid(puissanceQ, puissanceQcontainer, "cellQ", makeMovePuissanceQ);
}

function makeMovePuissanceQ(i, j) {
  if (gameEnd) return;

  for (let row = puissanceQ.length - 1; row >= 0; row--) {
    if (puissanceQ[row][j] === null) {
      puissanceQ[row][j] = currentPlayer;
      displayPQ();

      if (checkGameEnd(puissanceQ, 4)) return;

      switchPlayer();
      playAI(puissanceQ, displayPQ, 4);

      break;
    }
  }
}

function iaMovePuissanceQ() {
  if (gameEnd) return;

  let colSelected = Math.floor(Math.random() * puissanceQ[0].length);

  for (let row = puissanceQ.length - 1; row >= 0; row--) {
    if (puissanceQ[row][colSelected] === null) {
      puissanceQ[row][colSelected] = iaplayer;
      displayPQ();

      if (checkWin(puissanceQ, 4)) {
        showEndMessage( iaplayer.alt + "a gagné!");
        gameEnd = true;
      } else {
        currentPlayer = playerOne;
        toggleClicks(true);
      }
      break;
    }
  }
}


////////////////////////////////////  BUTTON RESET    ////////////////////////////////

function playAI(grid, displayFunction, cellsToWin) {
  if (gameMode === "vsIa" && currentPlayer === iaplayer && !gameEnd) {
    toggleClicks(false);
    setTimeout(() => {
      if (grid === Morpion) {
        aiMorpion();
      } else if (grid === puissanceQ) {
        iaMovePuissanceQ();
      }
      displayFunction();
    }, 1000);
  }
}

function ResetGame() {

  resetbtn.textContent = "";

  const resetButton = createButton("Recommencer", () => {
    currentPlayer = playerOne;
    gameEnd = false;
    msgEnd.textContent = "";
    resetMorpion()
    resetPQ()
    displayMorpion()
    displayPQ()
    hideEndMessage()
  });
  resetbtncontainer.appendChild(resetButton);
}

function restartButton() {
  restartbtn.textContent = "";

  const restartButton = createButton("Change d'Adversaire", () => {

    gameModecontainer.style.display = "flex";
    playerOne = null;
    playerTwo = null;
    currentPlayer = null;
    gameEnd = false;
    msgEnd.textContent = "";
    hideEndMessage() 
    ResetGame()
    SelectgameMode();

  });
  restartbtn.appendChild(restartButton);
}


////////////////////////////////////  GENERIQUE    ////////////////////////////////

//------------------------------------------ function Tableau

function displayGrid(grid, container, cellClass, moveFunction) {
  container.textContent = "";

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const cellElement = document.createElement("div");
      cellElement.classList.add(cellClass);

      if (cell) {
        cellElement.appendChild(createImage(cell.src, cell.alt, ["imag-cell"]));
      }

      cellElement.addEventListener("click", () => moveFunction(i, j));
      container.appendChild(cellElement);
    });
  });
}
//------------------------------------------ function cherche gagnant

function checkWin(grid, cellToWin) {
  const directions = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: -1 }
  ];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const player = grid[row][col];
      if (!player) continue;

      for (const { x: dx, y: dy } of directions) {
        if (checkDirection(grid, row, col, dx, dy, cellToWin, player)) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkDirection(grid, row, col, dx, dy, cellToWin, player) {
  for (let i = 1; i < cellToWin; i++) {
    const newRow = row + i * dx;
    const newCol = col + i * dy;

    if (
      newRow < 0 || newRow >= grid.length ||
      newCol < 0 || newCol >= grid[0].length ||
      grid[newRow][newCol] !== player
    ) {
      return false;
    }
  }
  return true;
}


function checkGameEnd(grid, cellsToWin) {
  if (checkWin(grid, cellsToWin)) {
    showEndMessage(currentPlayer.alt + " a gagné !");
    gameEnd = true;
    return true;
  }

  if (grid.every(row => row.every(cell => cell !== null))) {
    showEndMessage( "Match nul !");
    gameEnd = true;
    return true;
  }

  return false;
}

//------------------------------------------ Change joueur

function switchPlayer() {
  currentPlayer = (currentPlayer === playerOne ? playerTwo : playerOne);
}
//------------------------------------------ Bloque click

function toggleClicks(isEnabled) {
  const cells = document.querySelectorAll(".cell,.cellQ");
  cells.forEach(cell => {
    cell.style.pointerEvents = isEnabled ? 'auto' : 'none';
  });
}

//-----------------------------------------------evite repetion code
//                                             IMG
function createImage(src, alt, classes = []) {
  const img = new Image();
  img.src = src;
  img.alt = alt;

  classes.forEach(className => img.classList.add(className));

  return img;
}
//                                               BUTTON
function createButton(text, onClickFunction) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener("click", onClickFunction);
  return button;
}

//-----------------------------------------------------------reset tableau
function resetGrid(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

const resetMorpion = () => {
  Morpion = resetGrid(3, 3);
}
const resetPQ = () => {
  puissanceQ = resetGrid(6, 7);
}

function showEndMessage(message) {
  msgEnd.textContent = message;
  msgEnd.classList.add("show"); // Affiche l'overlay
}

function hideEndMessage() {
  msgEnd.classList.remove("show"); // Masque l'overlay
}
