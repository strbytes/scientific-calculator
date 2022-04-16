const screen = document.querySelector("#screen");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const signButton = document.querySelector("#sign");
const decimalButton = document.querySelector("#decimal");

numberButtons.forEach((numButton) => {
  numButton.addEventListener("click", numButtonPress);
});

operatorButtons.forEach((opButton) => {
  opButton.addEventListener("click", opButtonPress);
});

signButton.addEventListener("click", toggleSign);
decimalButton.addEventListener("click", decimalAdd);

const operators = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => x / y,
  pct: (x) => x * 0.01,
};

function operate(operator, x, y) {
  return operator(x, y);
}

function numButtonPress(event) {
  num = event.target.id;
  screen.textContent += num;
}
