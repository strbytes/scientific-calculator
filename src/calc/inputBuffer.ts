class InputBuffer {
  #tokens = [];
  #displayTokens = [];
  #cursor = 0;

  add(token, display) {
    this.#tokens.splice(this.#cursor, 0, token);
    this.#displayTokens.splice(this.#cursor, 0, display ? display : token);
    this.#cursor += 1;
  }

  ans(answer) {
    for (let i = 0; i < this.#tokens.length; i++) {
      if (this.#displayTokens[i] === "ANS") {
        this.#tokens[i] = answer;
      }
    }
  }

  clear() {
    this.#tokens = [];
    this.#displayTokens = [];
    this.#cursor = 0;
  }

  del() {
    if (this.#tokens.length !== 0 && this.#cursor !== this.#tokens.length) {
      this.#tokens.splice(this.#cursor, 1);
      this.#displayTokens.splice(this.#cursor, 1);
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
    let displayStart = 0;
    let displayEnd = 1;
    let displayCursor = 0;
    let length = 0;
    let displayTokens = [...this.#displayTokens, "&nbsp"];

    for (let i = 0; i < this.#displayTokens.length; i++) {
      let token = this.#displayTokens[i];
      let tokenLength = token === "&nbsp" ? 1 : token.length;

      if (i < this.#cursor) {
        displayCursor += 1;
      }
      if (length + tokenLength < 18) {
        displayEnd += 1;
        length += tokenLength;

      } else {
        if (displayCursor > 0) {
          displayStart += 1;
          length -= displayTokens[displayStart].length;
          displayEnd += 1; 
          length += tokenLength;
          displayCursor -= 1;

        } else if (displayCursor === 0) {
          displayEnd -= 1;
          break

        } else if (displayCursor < 0) {
          displayStart -= 1;
          length += displayTokens[displayStart].length;
          displayEnd -= 1;
          length -= tokenLength;
        }
      }
    }

    let stringBuilder = displayTokens.slice(displayStart, displayEnd);
    let cursorChar = stringBuilder[displayCursor];
    stringBuilder[displayCursor] = `<span id='cursor'>${cursorChar}</span>`

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
