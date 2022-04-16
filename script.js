const nums = document.querySelectorAll(".numbers");
const ops = document.querySelectorAll(".operators");
const sign = document.querySelector("#sign");
const decimal = document.querySelector("#decimal");

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
