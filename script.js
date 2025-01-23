const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');
let currentPlayer = 'X'; // Starting player
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Game state
let gameActive = true; // Game state

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        // If the cell is already filled or the game is over, do nothing
        if (gameBoard[index] || !gameActive) return;

        // Update game state
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;

        // Add color class for X or O
        cell.classList.add(currentPlayer.toLowerCase());

        // Check for a winner or draw
        if (checkWinner()) {
            gameStatus.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell)) {
            gameStatus.textContent = "It's a draw!";
            gameActive = false;
        } else {
            // Switch player turn
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            gameStatus.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

// Check if the current player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Restart the game
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reset the game state
    gameActive = true;
    currentPlayer = 'X'; // Reset to player X
    gameStatus.textContent = `Player ${currentPlayer}'s turn`;

    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
});
