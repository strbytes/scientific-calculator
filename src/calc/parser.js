const BinaryExpr = require("./expr").BinaryExpr;
const CallExpr = require("./expr").CallExpr;
const Literal = require("./expr").Literal;

/*
 * Built-in operators.
 */
const Terms = ["+", "-"];
const Factors = ["*", "/"];
const Exponents = ["^"];
const Unary = ["negate"];
const Delimiters = ["(", ")"];

/*
 * Covert a TokenBuffer into a nested Expression structure.
 */
function parser(source) {
  let expression = factor(source);
  while (Terms.includes(source.current)) {
    let operator = source.pop();
    let right = factor(source);
    expression = new BinaryExpr(expression, operator, right);
  }
  return expression;
}

function factor(source) {
  let expression = exponent(source);
  while (Factors.includes(source.current)) {
    let operator = source.pop();
    let right = exponent(source);
    expression = new BinaryExpr(expression, operator, right);
  }
  return expression;  
}

function exponent(source) {
  let expression = unary(source);
  while (Exponents.includes(source.current)) {
    let operator = source.pop();
    let right = unary(source);
    expression = new BinaryExpr(expression, operator, right);
  }
  return expression;  
}

function unary(source) {
  if (Unary.includes(source.current)) {
    let operator = source.pop();
    let operand = callExpr(source);
    return new CallExpr(operator, operand);
  }
  return callExpr(source);
}
// TODO xrt special case?

function callExpr(source) {
  if (is_call(source.current)) {
    let operator = source.pop().slice(0, -1);
    let operand = parser(source);
    if (source.current === ")") {
      source.pop();
    }
    return new CallExpr(operator, operand);
  }
  return literal(source);
}

function literal(source) {
  let expression;
  if (is_literal(source.current) || is_name(source.current)) {
    expression = new Literal(source.pop());
  } else if (source.current === "(") {
    source.pop();
    expression = parser(source);
    if (source.current === ")") {
      source.pop()
    }
  } else {
    throw `Invalid literal ${source.current}`;
  }
  if (   is_literal(source.current) 
      || is_name(source.current) 
      || source.current === "(" ) {
    expression = new BinaryExpr(expression, "*", exponent(source));
  }
  return expression;
}

function is_literal(token) {
  return (typeof token === "number");
}

function is_name(token) {
  return token ? /^[a-zA-Z]+$/.test(token) : false;
}

function is_call(token) {
  return token ? /^[a-zA-Z]+\($/.test(token) : false;
}

module.exports = parser;