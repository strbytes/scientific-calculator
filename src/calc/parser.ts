import TokenBuffer from "./tokenBuffer";

import { Expression, BinaryExpr, CallExpr, Literal } from "./expr";

/*
 * Built-in operators.
 */
const Terms = ["+", "-"];
const Factors = ["*", "/", ")E("];
const Exponents = ["^", ")squared", ")inverted"];
const Unary = ["negate"];

/*
 * Covert a TokenBuffer into a nested Expression structure.
 */
export default function parser(source: TokenBuffer) {
  let expression = factor(source);
  while (!is_end(source.current) && Terms.includes(source.current.toString())) {
    let operator = source.pop();
    let right = factor(source);
    expression = new BinaryExpr(expression, operator, right);
  }
  return expression;
}

function factor(source: TokenBuffer) {
  let expression = exponent(source);
  while (
    !is_end(source.current) &&
    Factors.includes(source.current.toString())
  ) {
    let operator = source.pop();
    let right = exponent(source);
    expression = new BinaryExpr(expression, operator, right);
  }
  return expression;
}

function exponent(source: TokenBuffer) {
  let expression = unary(source);
  while (
    !is_end(source.current) &&
    Exponents.includes(source.current.toString())
  ) {
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

function unary(source: TokenBuffer) {
  if (!is_end(source.current) && Unary.includes(source.current.toString())) {
    let operator = source.pop();
    let operand = callExpr(source);
    return new CallExpr(operator, operand);
  }
  return postfix(source);
}

function postfix(source: TokenBuffer) {
  let expression = callExpr(source);
  while (!is_end(source.current) && is_postfix(source.current)) {
    let operator = source.pop().toString().slice(1);
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

function callExpr(source: TokenBuffer) {
  if (!is_end(source.current) && is_call(source.current)) {
    let operator = source.pop().toString().slice(0, -1);
    let operand = parser(source);
    if (source.current === ")") {
      source.pop();
    }
    return new CallExpr(operator, operand);
  }
  return literal(source);
}

function literal(source: TokenBuffer) {
  let expression: Expression;
  if (is_literal(source.current) || is_name(source.current)) {
    return new Literal(source.pop());
  } else if (source.current === "(") {
    source.pop();
    expression = parser(source);
    if (source.current.toString() === ")") {
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

function is_end(token: string | number) {
  return typeof token === "string" && token === "END";
}

function is_literal(token: string | number) {
  return typeof token === "number";
}

function is_name(token: string | number) {
  return token ? /^[a-zA-Z]+$/.test(token.toString()) : false;
}

function is_call(token: string | number) {
  return token ? /^[a-zA-Z]+\($/.test(token.toString()) : false;
}

function is_postfix(token: string | number) {
  return token ? /^\)[a-zA-Z]+\(?$/.test(token.toString()) : false;
}
