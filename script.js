/*global document*/
/*eslint-env es6*/

var statusDisplay = document.querySelector('.game--status');

var gameActive = true;
var currentPlayer = "X";
var gameState = ["", "", "", "",
                 "", "", "", "",
                 "", "", "", "",
                 "", "", "", ""];

var winningMessage = () => `Player ${currentPlayer} Wins!`;
var drawMessage = () => `Draw!`;
var currentPlayerTurn = () => `${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

var winningConditions = [
    [0, 1, 2],      [1, 2, 3], // Horizontal Check
    [4, 5, 6],      [5, 6, 7],
    [8, 9, 10],     [9, 10, 11],
    [12, 13, 14],   [13, 14, 15],
    
    [0, 4, 8],      [4, 8, 12], // Vertical Check
    [1, 5, 9],      [5, 9, 13],
    [2, 6, 10],     [6, 10, 14],
    [3, 7, 11],     [7, 11, 15],

    [0, 5, 10],     [5, 10, 15], // Diagonal Check
    [1, 6, 11],     [4, 9, 14],
    [3, 6, 9],      [6, 9, 12],
    [2, 5, 8],      [7, 10, 13]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <=23; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "",
                 "", "", "", "",
                 "", "", "", "",
                 "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
