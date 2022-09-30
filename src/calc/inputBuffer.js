class InputBuffer {
  #tokens = [];
  #displayTokens = [];
  #cursor = 0;

  add(token, display) {
    this.#tokens.splice(this.#cursor, 0, token);
    this.#displayTokens.splice(this.#cursor, 0, display ? display : token);
    this.#cursor += 1;
  }

  clear() {
    this.#tokens = [];
    this.#displayTokens = [];
    this.#cursor = 0;
  }

  del() {
    if (this.#tokens.length !== 0) {
      this.#tokens.splice(this.#cursor, 1);
      this.#displayTokens.splice(this.#cursor, 1);
      if (this.#cursor === this.#tokens.length) {
        this.#cursor -= 1;
      }
    }
  }
  
  insert(token, display) {
    this.#tokens.splice(this.#cursor, 1, token);
    this.#displayTokens.splice(this.#cursor, 1, display ? display : token);
  }

  left() {
    if (this.#cursor > 0) {
      this.#cursor -= 1;
    }
  }

  right() {
    if (this.#cursor < this.#tokens.length) {
      this.#cursor += 1;
    }
  }

  get cursor() {
    return this.#cursor;
  }

  get length() {
    return this.#tokens.length;
  }

  toString() {
    let stringBuilder = [];
    for (let i = 0; i <= this.#displayTokens.length; i++) {
      let token = this.#displayTokens[i] ? this.#displayTokens[i] : "&nbsp";
      if (i === this.#cursor) {
          stringBuilder.push(`<span id='cursor'>${token}</span>`);
      } else {
        stringBuilder.push(token);
      }
    }

    return stringBuilder.join("");
  }

  [Symbol.iterator]() {
    let index = -1;
    let tokens = this.#tokens;

    return {
      next: () => ({ value: tokens[++index], done: !(index in tokens) })
    };
  }
}

module.exports = InputBuffer;
