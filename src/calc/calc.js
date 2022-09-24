import InputBuffer from './buffer.js';

class Calculator {
    #buffer = new InputBuffer();
    #inputScreen = document.querySelector("#input-screen");
    #outputScreen = document.querySelector("#output-screen");
    #second = false;
    #specialKeys = {
        "equals": this.evaluate(this.#buffer),
        "clear": this.#buffer.clear.bind(this.#buffer),
        "del": this.#buffer.del.bind(this.#buffer),
        "left": this.#buffer.left.bind(this.#buffer),
        "right": this.#buffer.right.bind(this.#buffer),
        "second": _ => this.#second = this.#second? false : true,
    }

    evaluate(b) {
        // TODO
    }

    keyHandler(e) {
        let key = e.target;
        let keyValue = this.#second? key.dataset.secondaryValue : key.id;
        let keySymbol = this.#second? key.dataset.secondaryValue : key.id;

        if (this.#specialKeys.hasOwnProperty(keyValue)) {
            this.#specialKeys[keyValue]();
        } else {
            this.#buffer.add(keyValue);
        }
        if (keyValue !== "second") this.#second = false;

        // TODO update buffer to display symbols somehow
        // Store it in buttons as a data value?
        // Store controls as a new module containing all control information
            // accessed by ControlBuilder and Calculator
        this.#inputScreen.textContent = this.#buffer.toString();
    }
}
export default Calculator;
