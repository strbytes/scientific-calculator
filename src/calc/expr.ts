type unaryFn = (x: number) => number;
type binaryFn = (x: number, y: number) => number;
type Values = number | unaryFn | binaryFn;

function assertIsNumber(operator: Values): asserts operator is number {
  if (typeof operator === "number") {
    throw `Type error: expected unaryFn, found ${typeof operator}`;
  }
}

function assertIsUnary(operator: Values): asserts operator is unaryFn {
  if (typeof operator != "number" && operator.length == 1) {
    throw `Type error: expected unaryFn, found ${typeof operator}`;
  }
}

function assertIsBinary(operator: Values): asserts operator is binaryFn {
  if (typeof operator != "number" && operator.length == 2) {
    throw `Type error: expected binaryFn, found ${typeof operator}`;
  }
}

interface Environment {
  [key: string]: Values;
}

const Globals: Environment = {
  // Symbols in names prevent special operations from being interpreted twice.
  log: Math.log10,
  tenPow: (x: number) => 10 ** x,
  ln: Math.log,
  ePow: (x: number) => Math.E ** x,
  pi: Math.PI,
  e: Math.E,
  "^": Math.pow,
  xrt: (x: number, y: number) => y ** (1 / x),
  sqrt: Math.sqrt,
  squared: (x: number) => x ** 2,
  sin: Math.sin,
  asin: Math.asin,
  cos: Math.cos,
  acos: Math.acos,
  tan: Math.tan,
  atan: Math.atan,
  inverted: (x: number) => x ** -1,
  E: (x: number, y: number) => x * 10 ** y,
  negate: (x: number) => -x,
  "+": (x: number, y: number) => x + y,
  "-": (x: number, y: number) => x - y,
  "*": (x: number, y: number) => x * y,
  "/": (x: number, y: number) => x / y,
};

export class Expression {
  #args: (Expression | string | number)[];
  constructor(...args: (Expression | string | number)[]) {
    this.#args = args;
  }

  eval(): number {
    throw "Superclass method not implemented";
  }

  toString() {
    return this.constructor.name + "(" + this.#args + ")";
  }
}

export class BinaryExpr extends Expression {
  #left: Expression;
  #operator: string;
  #right: Expression;

  constructor(left: Expression, operator: string, right: Expression) {
    super(left, operator, right);
    this.#left = left;
    this.#operator = operator;
    this.#right = right;
  }

  eval() {
    let left = this.#left.eval();
    let operator = Globals[this.#operator];
    assertIsBinary(operator);
    let right = this.#right.eval();
    return operator(left, right);
  }
}

export class CallExpr extends Expression {
  #operator: string;
  #operand: Expression;

  constructor(operator: string, operand: Expression) {
    super(operator, operand);
    this.#operator = operator;
    this.#operand = operand;
  }

  eval() {
    if (!Globals[this.#operator]) {
      throw `Name ${this.#operator} not found`;
    }
    let operator = Globals[this.#operator];
    assertIsUnary(operator);
    let operand = this.#operand.eval();
    return operator(operand);
  }
}

export class Literal extends Expression {
  #value: string | number;
  constructor(value: string | number) {
    super(value);
    this.#value = value;
  }

  eval() {
    if (typeof this.#value == "number") {
      return this.#value;
    } else {
      if (!Globals[this.#value]) {
        throw `Name ${this.#value} not found`;
      }
      let value = Globals[this.#value];
      assertIsNumber(value);
      return value;
    }
  }
}
