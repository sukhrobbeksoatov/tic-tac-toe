const elCells = document.querySelectorAll("[data-cell]");
const elTurnText = document.querySelector("[data-turn-text]");
const elResultText = document.querySelector("[data-result]");
const elScoreX = document.querySelector("[data-score-x]");
const elScoreO = document.querySelector("[data-score-o]");

let arr = ["", "", "", "", "", "", "", "", ""];
let winner = "";
let scoreX = 0;
let scoreO = 0;
const symbols = ["x", "0"];
const randomNum = Math.trunc(Math.random() * symbols.length);

let turn = symbols[randomNum];
elTurnText.textContent = `turn: ${turn}`;

// Document click event
document.addEventListener("click", (evt) => {
  clickCell(evt);
  restartClick(evt);
  scoreRestartClick(evt);
});

// Click cell
function clickCell(evt) {
  const el = evt.target.closest("[data-cell]");

  if (!el) return;
  if (el.classList.contains("active-x") || el.classList.contains("active-o"))
    return;

  // Winner logic
  if (winner === "") {
    arr[el.dataset.cellId] = turn;
    el.classList.add(turn === "x" ? "active-x" : "active-o");
  } else if (winner !== "") return;
  if (
    (arr[0] === arr[1] && arr[1] === arr[2] && arr[2] !== "") ||
    (arr[3] === arr[4] && arr[4] === arr[5] && arr[5] !== "") ||
    (arr[6] === arr[7] && arr[7] === arr[8] && arr[8] !== "") ||
    (arr[0] === arr[3] && arr[3] === arr[6] && arr[6] !== "") ||
    (arr[1] === arr[4] && arr[4] === arr[7] && arr[7] !== "") ||
    (arr[2] === arr[5] && arr[5] === arr[8] && arr[8] !== "") ||
    (arr[0] === arr[4] && arr[4] === arr[8] && arr[8] !== "") ||
    (arr[2] === arr[4] && arr[4] === arr[6] && arr[6] !== "")
  ) {
    winner = turn;
    winner === "x" ? (scoreX += 1) : (scoreO += 1);
    elScoreX.textContent = `X: ${scoreX}`;
    elScoreO.textContent = `0: ${scoreO}`;
    elResultText.textContent = `Winner: ${turn}`;
    return;
  } else {
    elResultText.textContent = "No one has won yet!";
  }
  elTurnText.textContent = turn === "x" ? "turn: 0" : "turn: x";
  turn = turn === "x" ? "0" : "x";
}

// Click restart
function restartClick(evt) {
  const el = evt.target.closest("[data-restart]");

  if (!el) return;

  elCells.forEach((btn) => btn.classList.remove("active-x", "active-o"));
  winner = "";
  elResultText.textContent = `Winner: -`;
  arr = ["", "", "", "", "", "", "", "", ""];
}

// Score click restart
function scoreRestartClick(evt) {
  const el = evt.target.closest("[data-score-restart]");

  if (!el) return;
  scoreO = 0;
  scoreX = 0;
  elScoreX.textContent = `X: ${scoreX}`;
  elScoreO.textContent = `0: ${scoreO}`;
}

// set ID
elCells.forEach((btn, i) => (btn.dataset.cellId = i));
