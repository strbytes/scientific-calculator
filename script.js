// ---- MODEL ----
// calculator object -- stores state and calculator functionality
const Calculator = {
  // state
  currOperation: null,
  prevOperation: null,

  // methods
  newBinaryOperation: function (operator, x) {
    // return an operation function that is executed when Calculator.execute is called
    Calculator.prevOperation = null;
    Calculator.currOperation = (y) => {
      // When executed, set prevOperation to repeat the current operation
      Calculator.newPrevOperation(operator, y);
      return BinaryOperators[operator](x, y);
    };
  },

  newPrevOperation: function (operator, y) {
    Calculator.prevOperation = (x) => {
      return BinaryOperators[operator](x, y);
    };
  },
  applyUnaryOperation: function (operator, x) {
    Screen.display(UnaryOperators[operator](x));
  },

  execute: function (y) {
    if (Calculator.prevOperation) {
      Screen.display(Calculator.prevOperation(y));
    } else if (Calculator.currOperation) {
      if (Screen.newNum) y = 0;
      Screen.display(Calculator.currOperation(y));
    }
    Calculator.currOperation = null;
  },

  clear: function () {
    Calculator.currOperation = null;
    Calculator.prevOperation = null;
  },
};

// Store operations to be used by the calculator
const BinaryOperators = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => {
    if (y === 0) return "ERR";
    return x / y;
  },
  mod: (x, y) => {
    if (y === 0) return "ERR";
    return x % y;
  },
  exp: (x, y) => x ** y,
};

const UnaryOperators = {
  inv: (x) => 1 / x,
  sqrt: (x) => Math.sqrt(x),
  log: (x) => Math.log(x),
};

// ---- VIEW ----
// screen receives output of model and certain input from controls

const Screen = {
  screenSelector: document.querySelector("#screen"),
  newNum: false,
  display: function (results) {
    Screen.screenSelector.textContent = this.trimResults(results);
  },

  trimResults: function (results) {
    // Format results to fit screen
    if (results.toString().includes("ERR")) {
      // Skip tests if results are an error
      return results;
    } else if (results.toExponential().split("e")[1] > 8) {
      // represent large numbers using e notation
      results = results.toExponential(2);
    } else if (results.toExponential().split("e")[1] < -6) {
      // represent small numbers using e notation
      results = results.toExponential(2);
    } else if (results.toString().length > 9) {
      // truncate long decimals
      results = results.toString().substring(0, 8);
    }
    return results;
  },

  addDigit: function (num) {
    if (Screen.newNum) {
      Calculator.prevOperation = null;
      // Reset screen when entering next number
      Screen.screenSelector.textContent = num;
      Screen.newNum = false;
    } else if (Screen.screenSelector.textContent.length === 9) {
      // if entered number would exceed the length of the screen, do nothing
      return;
    } else if (Screen.screenSelector.textContent === "0") {
      // If screen is 0, reset it with next entered number
      // But only if the number is not 0
      if (num !== "0") {
        Screen.screenSelector.textContent = num;
      }
      // otherwise, add the number to the end of the screen
    } else {
      Screen.screenSelector.textContent += num;
    }
  },

  clearScreen: function () {
    Screen.screenSelector.textContent = 0;
  },
};

// ---- CONTROLLER ----
// No Controller object, just global selectors and listeners
// buttons selectors divided by grouping (numbers, binary operators, clear, etc)

const numberButtons = document.querySelectorAll(".numbers");
numberButtons.forEach((numButton) => {
  numButton.addEventListener("click", numButtonPress);
});
function numButtonPress(event) {
  let num = event.target.id;
  Screen.addDigit(num);
}

const binaryOperatorButtons = document.querySelectorAll(".binaryOperators");
binaryOperatorButtons.forEach((binaryOperatorButton) => {
  binaryOperatorButton.addEventListener("click", binaryOperatorButtonPress);
});
function binaryOperatorButtonPress(event) {
  if (Screen.screenSelector.textContent.includes("ERR")) {
    return; // do nothing if error present
  }
  let operator = event.target.id;
  let num = +Screen.screenSelector.textContent;
  if (Calculator.currOperation) {
    // chain operations by automatically executing partially-entered
    // operations if another operator button is pressed
    Calculator.execute(num);
  }
  Calculator.newBinaryOperation(operator, num);
  Screen.newNum = true;
}

const unaryOperatorButtons = document.querySelector(".unaryOperators");
unaryOperatorButtons.addEventListener("click", unaryOperatorButtonPress);
function unaryOperatorButtonPress(event) {
  if (Screen.screenSelector.textContent.includes("ERR"))
    return; // do nothing if error
  else if (Screen.newNum) Calculator.clear();
  let operator = event.target.id;
  num = +Screen.screenSelector.textContent;
  Screen.display(UnaryOperators[operator](num));
  // Screen.newNum = true;
}

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", equalsButtonPress);
function equalsButtonPress(_) {
  Calculator.execute(+Screen.screenSelector.textContent);
  Screen.newNum = true;
}

const clearButtons = document.querySelectorAll(".clear");
clearButtons.forEach((clearButton) => {
  clearButton.addEventListener("click", clearButtonPress);
});
function clearButtonPress(event) {
  // Clear the screen
  Screen.screenSelector.textContent = "0";
  if (event.target.id == "C") {
    // Clear all
    Calculator.clear();
  }
}

const signButton = document.querySelector("#sign");
const decimalButton = document.querySelector("#decimal");

// rootButton.addEventListener("click", () => {
//   if (screen.textContent.includes("ERR")) return; // do nothing if error
//   result = Math.sqrt(+screen.textContent);
//   result = trimResults(result);
//   screen.textContent = result;
// });

signButton.addEventListener("click", toggleSign);
decimalButton.addEventListener("click", decimalAdd);

function Operation(operator, x) {
  this.operator = operator;
  this.x = x;
  this.y;
  this.operate = function () {
    return this.operator(this.x, this.y);
  };
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
  prevOperation = null;
}

function toggleSign(_) {
  // Don't toggle if screen is 0 or error
  if (screen.textContent === "0" || screen.textContent.includes("ERR")) {
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
  if (screen.textContent.includes("ERR")) return;
  if (
    !screen.textContent.includes(".") &&
    !screen.textContent.includes("ERR")
  ) {
    // only add a decimal if none present and no error
    screen.textContent += ".";
  }
}

function equals(_) {
  // don't do anything if no operation started
  if (currOperation || prevOperation) {
    if (prevOperation) {
      // check for previous operation to repeat
      let x = +screen.textContent;
      prevOperation.x = x;
      currOperation = prevOperation;
    } else if (currOperation) {
      // if no previous, use current
      let y = +screen.textContent;
      // Assume y = 0 if a new number hasn't been entered yet
      if (newNum) {
        y = 0;
        newNum = false;
      }
      currOperation.y = y;
    }
    let results = currOperation.operate(currOperation.x, currOperation.y);
    results = trimResults(results);
    screen.textContent = results.toString();
    // save previous operation
    prevOperation = currOperation;
    prevOperation.x = null;
    // reset current operation and screen
    currOperation = null;
    newNum = true;
  }
}
