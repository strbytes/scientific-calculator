import InputBuffer from './buffer.js';

class Calculator {
    #buffer = new InputBuffer();
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
        let keyValue = second? key.dataset.secondaryValue : key.id;
        
        if (this.#specialKeys.hasOwnProperty(keyValue)) {
            this.#specialKeys[keyValue]();
        }
        
        if (keyValue !== "second") this.#second = false;
        console.log(`keyValue=${keyValue}, second=${this.#second}`);
    }
}

export default Calculator;
