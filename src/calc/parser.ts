const BinaryExpr = require("./expr").BinaryExpr;
const CallExpr = require("./expr").CallExpr;
const Literal = require("./expr").Literal;

/*
 * Built-in operators.
 */
const Terms = ["+", "-"];
const Factors = ["*", "/", ")E("];
const Exponents = ["^", ")squared", ")inverted"];
const Unary = ["negate"];
const Delimiters = ["(", ")"];

/*
 * Covert a TokenBuffer into a nested Expression structure.
 */
export default function parser(source) {
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
    if (is_postfix(source.current)) {
      let operator = source.pop();
      expression = new CallExpr(operator, expression);
    } else {
      let operator = source.pop();
      let right = unary(source);
      expression = new BinaryExpr(expression, operator, right);
    }
  }
  return expression;
}

function unary(source) {
  if (Unary.includes(source.current)) {
    let operator = source.pop();
    let operand = callExpr(source);
    return new CallExpr(operator, operand);
  }
  return postfix(source);
}

function postfix(source) {
  let expression = callExpr(source);
  while (is_postfix(source.current)) {
    let operator = source.pop().slice(1);
    if (is_call(operator)) {
      operator = operator.slice(0, -1);
      let right = parser(source);
      expression = new BinaryExpr(expression, operator, right);
    } else {
      expression = new CallExpr(operator, expression);
    }
  }
  return expression;
}

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
      source.pop();
    }
  } else {
    throw `Invalid literal ${source.current}`;
  }
  if (
    is_literal(source.current) ||
    is_name(source.current) ||
    is_call(source.current) ||
    source.current === "("
  ) {
    expression = new BinaryExpr(expression, "*", exponent(source));
  }
  return expression;
}

function is_literal(token) {
  return typeof token === "number";
}

function is_name(token) {
  return token ? /^[a-zA-Z]+$/.test(token) : false;
}

function is_call(token) {
  return token ? /^[a-zA-Z]+\($/.test(token) : false;
}

function is_postfix(token) {
  return token ? /^\)[a-zA-Z]+\(?$/.test(token) : false;
}
