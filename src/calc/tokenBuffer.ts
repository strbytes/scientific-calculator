/**
 * Stores a series of tokens to be used by the parser, and provides a queue-
 * like interface for accessing them.
 */ 
class TokenBuffer {
  #tokens;
  #index = 0;

  constructor(inputBuffer) {
    this.#tokens = [];

    let numberBuilder = [];
    for (let t of inputBuffer) {
      if (isNumeric(t)) {
        numberBuilder.push(t);
      } else if (numberBuilder.length > 0) {
        // TODO how to handle bad inputs
        // TODO make this a function
        let number = parseFloat(numberBuilder.join(""));
        numberBuilder = [];
        this.#tokens.push(number);
        this.#tokens.push(t);
      } else { 
        this.#tokens.push(t);
      }
    }

    // Last tokens are a number
    if (numberBuilder.length > 0) {
      // TODO how to handle bad inputs
      // TODO make this a function
      let number = parseFloat(numberBuilder.join(""));
      this.#tokens.push(number);
    }
  }

  /**
   * Returns the current token in the buffer. Undefined response indicates end 
   * of buffer.
   */
  get current() {
    return this.#tokens[this.#index];
  }

  /**
   * Returns the next token in the buffer. Undefined response indicates end of 
   * buffer.
   */
  get next() {
    return this.#tokens[this.#index + 1];
  }

  /**
   * Returns the next token in the buffer and advances the index. WIll throw
   * an exception if called past the end of the buffer.
   */
  pop() {
    if (this.#index == this.#tokens.length) {
      throw "Reached end of buffer";
    }
    let token = this.current;
    this.#index += 1;
    return token;
  }

  toString() {
    let stringBuilder = [];
    for (let i = 0; i < this.#tokens.length; i ++) {
      let t = this.#tokens[i];
      if (i == this.#index) {
        t = "_" + t + "_";
      }
      stringBuilder.push(t);
    }
    return "TokenBuffer[ '" + stringBuilder.join("', '") + "' ]";
  }
}

function isNumeric(token) {
  return [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."
  ].includes(token);
}

module.exports = TokenBuffer;