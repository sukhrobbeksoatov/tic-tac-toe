// elements
const elCells = document.querySelectorAll("[data-cell]"),
  elTurnText = document.querySelector("[data-turn-text]"),
  elResultText = document.querySelector("[data-result]"),
  elScoreX = document.querySelector("[data-score-x]"),
  elScoreO = document.querySelector("[data-score-o]");

// variables
let arr = new Array(9).fill(""),
  symbols = ["x", "0"],
  winner = "",
  scoreX = 0,
  scoreO = 0;

const randomNum = Math.trunc(Math.random() * symbols.length);
let turn = symbols[randomNum];

// content loaded
elTurnText.textContent = `turn: ${turn}`;
elCells.forEach((btn, i) => (btn.dataset.cellId = i));

// getWinner
const getWinner = arr => {
  // x-row, 3 lines
  if (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] !== "") return true;
  if (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] !== "") return true;
  if (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] !== "") return true;

  // y-col, 3-lines
  if (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] !== "") return true;
  if (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] !== "") return true;
  if (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] !== "") return true;

  // diagonal, 2-lines
  if (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] !== "") return true;
  if (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] !== "") return true;
};

// clickCell
const clickCell = evt => {
  const el = evt.target.closest("[data-cell]");
  if (!el) return;

  if (el.classList.contains("active-x") || el.classList.contains("active-o")) return;

  // winnerLogic
  if (winner === "") {
    arr[el.dataset.cellId] = turn;
    el.classList.add(turn === "x" ? "active-x" : "active-o");
  } else if (winner !== "") return;

  if (getWinner(arr)) {
    winner = turn;
    winner === "x" ? ++scoreX : ++scoreO;

    elScoreX.textContent = `X: ${scoreX}`;
    elScoreO.textContent = `0: ${scoreO}`;
    elResultText.textContent = `Winner: ${turn}`;

    return;
  } else elResultText.textContent = "No one has won yet!";

  elTurnText.textContent = turn === "x" ? "turn: 0" : "turn: x";
  turn = turn === "x" ? "0" : "x";
};

// restartClick
const restartClick = evt => {
  const el = evt.target.closest("[data-restart]");
  if (!el) return;

  elCells.forEach(btn => btn.classList.remove("active-x", "active-o"));
  winner = "";
  elResultText.textContent = `Winner: -`;
  arr = new Array(9).fill("");
};

// scoreRestartClick
const scoreRestartClick = evt => {
  const el = evt.target.closest("[data-score-restart]");
  if (!el) return;

  scoreO = 0;
  scoreX = 0;
  elScoreX.textContent = `X: ${scoreX}`;
  elScoreO.textContent = `0: ${scoreO}`;
};

// document click
document.addEventListener("click", evt => {
  clickCell(evt);
  restartClick(evt);
  scoreRestartClick(evt);
});
