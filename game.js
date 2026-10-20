const cells = Array.from(document.querySelectorAll(".game-cell"));
const status = document.querySelector("#game-status");
const resetButton = document.querySelector("#game-reset");

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";

function resetGame() {
  currentPlayer = "X";
  status.textContent = "X's turn";

  for (const cell of cells) {
    cell.textContent = "";
    cell.disabled = false;
  }
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  cell.textContent = currentPlayer;
  cell.disabled = true;

  const hasWon = winningLines.some((line) =>
    line.every((index) => cells[index].textContent === currentPlayer),
  );

  if (hasWon) {
    status.textContent = `${currentPlayer} wins!`;
    for (const boardCell of cells) {
      boardCell.disabled = true;
    }
    return;
  }

  if (cells.every((boardCell) => boardCell.textContent !== "")) {
    status.textContent = "It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `${currentPlayer}'s turn`;
}

for (const cell of cells) {
  cell.addEventListener("click", handleCellClick);
}

resetButton.addEventListener("click", resetGame);
