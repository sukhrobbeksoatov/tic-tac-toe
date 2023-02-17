const elCells = document.querySelectorAll("[data-cell]");
const elTurnText = document.querySelector("[data-turn-text]");
const elResultText = document.querySelector("[data-result]");

let arr = ["", "", "", "", "", "", "", "", ""];
let winner = "";
const symbols = ["x", "o"];
const randomNum = Math.trunc(Math.random() * symbols.length);

let turn = symbols[randomNum];
elTurnText.textContent = `turn: ${turn}`;

// Document click event
document.addEventListener("click", (evt) => {
  clickCell(evt);
  restartClick(evt);
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
  } else return;
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
    winner = arr[0];
    elResultText.textContent = `Winner: ${turn}`;
    return;
  } else {
    elResultText.textContent = "No one has won yet!";
  }
  elTurnText.textContent = turn === "x" ? "turn: o" : "turn: x";
  turn = turn === "x" ? "o" : "x";
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

// set ID
elCells.forEach((btn, i) => (btn.dataset.cellId = i));
