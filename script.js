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

function opButtonPress(event) {}
