import InputBuffer from "./inputBuffer";
import TokenBuffer from "./tokenBuffer";
import parser from "./parser";

class Calculator {
  #ans = 0;
  #buffer = new InputBuffer();
  #clear = false;
  #clearOutput = false;
  #insert = false;
  #inputScreen = document.querySelector("#input-screen");
  #outputScreen = document.querySelector("#output-screen");
  #second = false;
  #specialKeys = {
    equals: this.evaluate.bind(this),
    clear: (() => {
      this.#buffer.clear();
      this.#clear = false;
      if (this.#clearOutput) {
        this.#outputScreen.textContent = "";
        this.#clearOutput = false;
      } else {
        this.#clearOutput = true;
      }
    }).bind(this),
    del: this.#buffer.del.bind(this.#buffer),
    ins: () => (this.#insert = this.#insert ? false : true),
    left: this.#buffer.left.bind(this.#buffer),
    right: this.#buffer.right.bind(this.#buffer),
    second: () => (this.#second = this.#second ? false : true),
  };

  constructor() {
    this.#inputScreen.innerHTML = this.#buffer.toString();
  }

  evaluate() {
    if (this.#buffer.length) {
      try {
        this.#buffer.ans(this.#ans);
        let tokens = new TokenBuffer(this.#buffer);
        let AST = parser(tokens);
        this.#ans = AST.eval();
        this.#outputScreen.textContent = this.#ans.toString();
        this.#clear = true;
      } catch (error) {
        console.log(error);
        this.#outputScreen.textContent = "ERROR";
        this.#clearOutput = true;
      }
    }
  }

  keyHandler(e: Event) {
    let key = e.target;
    if (!(key instanceof HTMLButtonElement)) {
      return;
    }
    let keyValue: string, keySymbol: string;
    if (this.#second) {
      keyValue = key.dataset.secondValue || key.id;
      keySymbol = key.dataset.secondBuffer || key.dataset.secondLabel;
    } else {
      keyValue = key.id;
      keySymbol = key.dataset.buffer || key.textContent;
    }

    if (this.#clear && keyValue !== "second") {
      if (keyValue in this.#specialKeys) {
        this.#clear = false;
      } else {
        this.#specialKeys["clear"]();
      }
    }

    if (this.#clearOutput && keyValue !== "clear") {
      this.#clearOutput = false;
    }

    if (this.#specialKeys.hasOwnProperty(keyValue)) {
      this.#specialKeys[keyValue]();
    } else if (this.#insert) {
      this.#buffer.insert(keyValue, keySymbol);
      this.#insert = false;
    } else {
      if (
        this.#buffer.length === 0 &&
        [
          "*",
          "/",
          "+",
          "-",
          "^",
          ")xrt(",
          ")squared",
          ")inverted",
          ")E(",
        ].includes(keyValue)
      ) {
        this.#buffer.add("ANS", "ANS");
      }
      this.#buffer.add(keyValue, keySymbol);
    }

    if (keyValue !== "second") this.#second = false;
    if (this.#second) {
      this.#inputScreen.classList.add("second");
    } else {
      this.#inputScreen.classList.remove("second");
    }

    if (this.#insert && ["clear", "del"].includes(keyValue)) {
      this.#insert = false;
    }
    if (this.#insert) {
      this.#inputScreen.classList.add("insert");
    } else {
      this.#inputScreen.classList.remove("insert");
    }

    this.#inputScreen.innerHTML = this.#buffer.toString();
  }
}

export default Calculator;
