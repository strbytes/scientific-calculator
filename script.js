const screen = document.querySelector("#screen");
const clearButtons = document.querySelectorAll(".clear");
const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const signButton = document.querySelector("#sign");
const decimalButton = document.querySelector("#decimal");
const equalsButton = document.querySelector("#equals");

clearButtons.forEach((clearButton) => {
  clearButton.addEventListener("click", clearButtonPress);
});

numberButtons.forEach((numButton) => {
  numButton.addEventListener("click", numButtonPress);
});

operatorButtons.forEach((opButton) => {
  opButton.addEventListener("click", opButtonPress);
});

signButton.addEventListener("click", toggleSign);
decimalButton.addEventListener("click", decimalAdd);
equalsButton.addEventListener("click", equals);

let currOperation;

const operators = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => x / y,
  pct: (x) => x * 0.01,
};

function Operation(operator, x) {
  this.operator = operator;
  this.x = x;
  this.y;
  this.operate = function () {
    return this.operator(this.x, this.y);
  };
}

function clearButtonPress(event) {
  // Clear the screen and all variables
  if (event.target.id === "CE") {
    // Clear screen only
    screen.textContent = "0";
  } else {
    // Clear all
    // TODO clear variables once they are added
    screen.textContent = "0";
  }
}

function numButtonPress(event) {
  num = event.target.id;
  // If screen is 0, reset it with next entered number
  if (screen.textContent === "0") {
    // But only if the number is not 0
    if (num !== "0") {
      screen.textContent = num;
    }
    // otherwise, add the number to the end of the screen
  } else {
    screen.textContent += num;
  }
}

function opButtonPress(event) {
  let operator = operators[event.target.id];
  let num = +screen.textContent;
  currOperation = new Operation(operator, num);
}

function toggleSign(_) {
  // Don't toggle if screen is 0
  if (screen.textContent !== "0") {
    return;
    // Remove '-' if present
  } else if (screen.textContent[0] === "-") {
    screen.textContent = screen.textContent.substring(1);
    // Add '-' if not present
  } else {
    screen.textContent = "-" + screen.textContent;
  }
}

function decimalAdd(_) {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

function equals(_) {
  // Not implemented yet
}
