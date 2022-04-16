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

let currOperation = null;
let newNum = false;

const operators = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => {
    if (y === 0) return "ERR";
    return x / y;
  },
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
    currOperation = null;
    screen.textContent = "0";
  }
}

function numButtonPress(event) {
  num = event.target.id;
  if (newNum) {
    // Reset screen when entering next number
    screen.textContent = num;
    newNum = false;
  } else if (screen.textContent.length === 8) {
    // if entered number would exceed the length of the screen, do nothing
    return;
  } else if (screen.textContent === "0") {
    // If screen is 0, reset it with next entered number
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
  // If another operation started, complete it before starting the next one
  if (currOperation) {
    equals();
  }
  let operator = operators[event.target.id];
  let num = +screen.textContent;
  currOperation = new Operation(operator, num);
  newNum = true;
}

function toggleSign(_) {
  // Don't toggle if screen is 0
  if (screen.textContent === "0") {
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
  // don't do anything if no operation started
  if (currOperation) {
    let y = +screen.textContent;
    // Assume y = 0 if a new number hasn't been entered yet
    if (newNum) {
      y = 0;
      newNum = false;
    }
    currOperation.y = y;
    let results = currOperation.operate(currOperation.x, currOperation.y);
    if (results !== "ERR") {
      // Skip tests if results are an error
      if (Math.floor(results / 10 ** 7) > 1) {
        // represent large numbers using e notation
        results = results.toExponential(2);
      } else if (results.toString().length > 8) {
        // truncate long decimals
        results = results.toString().substring(0, 8);
      }
    }
    screen.textContent = results.toString();
    // reset current operation and screen
    currOperation = null;
    newNum = true;
  }
}
