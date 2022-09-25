import InputBuffer from './inputBuffer.js';
import TokenBuffer from './tokenBuffer.js';
import parser from './parser.js';

class Calculator {
    #buffer = new InputBuffer();
    #inputScreen = document.querySelector("#input-screen");
    #outputScreen = document.querySelector("#output-screen");
    #second = false;
    #specialKeys = {
        "equals": this.evaluate.bind(this),
        "clear": this.#buffer.clear.bind(this.#buffer),
        "del": this.#buffer.del.bind(this.#buffer),
        "left": this.#buffer.left.bind(this.#buffer),
        "right": this.#buffer.right.bind(this.#buffer),
        "second": _ => this.#second = this.#second? false : true,
    };
    
    constructor() {
        this.#inputScreen.innerHTML = this.#buffer.toString();
    }

    evaluate() {
        let tokens = new TokenBuffer(this.#buffer);
        let AST = parser(tokens);
        this.#outputScreen.textContent = (AST.eval());
        // TODO set up screen clearing
            // clear when entering a new expression after evaluation
            // clear output on clear
    }

    keyHandler(e) {
        let key = e.target;
        let keyValue, keySymbol;
        if (this.#second) {
            keyValue = key.dataset.secondValue || key.id;
            keySymbol = key.dataset.secondBuffer || key.dataset.secondLabel;
        } else {
            keyValue = key.id;
            keySymbol = key.dataset.buffer || key.textContent;
        }

        if (this.#specialKeys.hasOwnProperty(keyValue)) {
            this.#specialKeys[keyValue]();
        } else {
            this.#buffer.add(keyValue, keySymbol);
        }

        if (keyValue !== "second") this.#second = false;
        if (this.#second) {
            this.#inputScreen.classList.add("second");
        } else {
            this.#inputScreen.classList.remove("second");
        }

        this.#inputScreen.innerHTML = this.#buffer.toString();
        
    }
}
export default Calculator;
