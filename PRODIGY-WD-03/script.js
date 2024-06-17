document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
    const popup = document.createElement('div');
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

    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let gameActive = true;

    popup.classList.add('popup');
    document.body.appendChild(popup);

    function showPopup(message) {
        popup.innerHTML = `<div>${message}</div><div class="close-btn">&times;</div>`;
        popup.style.display = 'block';
        document.querySelector('.close-btn').addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    function handleCellClick(e) {
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[cellIndex] !== null || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('clicked');

        if (checkWin()) {
            showPopup(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameState.every(cell => cell !== null)) {
            showPopup('Game is a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function restartGame() {
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('clicked');
        });
        currentPlayer = 'X';
        gameActive = true;
        popup.style.display = 'none';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
