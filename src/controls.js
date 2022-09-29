/* List of all calculator controls, organized by section. */
const controls = {
  edit: [
    {
      label: "del",
      second:"ins"
    },
    {
      label: "<-",
      value: "left",
    },
    {
      label: "->",
      value: "right",
    },
  ],

  left: [
    {
      label: "2nd",
      value: "second",
    },
    {
      label: "log",
      value: "log(",
      buffer: "log(",
      second: "10^",
      secondBuffer: "10^(",
      secondValue: "tenPow(",
    },
    {
      label: "ln",
      value: "ln(",
      buffer: "ln(",
      second: "e^",
      secondBuffer: "e^(",
      secondValue: "ePow(",
    },
    {
      label: "\u03c0",
      value: "pi",
      second: "e"
    },
    {
      label: "^",
      second: "\u02E3\u221A",
      secondValue: ")xrt(",
      secondBuffer: "\u02E3\u221A("
    },
    {
      label: "x\u00B2",
      value: ")squared",
      buffer: "\u00B2",
      second: "\u221A",
      secondValue: "sqrt(",
      secondBuffer: "\u221A("
    },
  ],

  top: [
    {
      label: "sin",
      value: "sin(",
      buffer: "sin(",
      second: "sin\u207B",
      secondValue: "asin(",
      secondBuffer: "sin\u207B("
    },
    {
      label: "cos",
      value: "cos(",
      buffer: "cos(",
      second: "cos\u207B",
      secondValue: "acos(",
      secondBuffer: "cos\u207B("
    },
    {
      label: "tan",
      value: "tan(",
      buffer: "tan(",
      second: "tan\u207B",
      secondValue: "atan(",
      secondBuffer: "tan\u207B(",
    },
    {
      label: "x\u207B\u00B9",
      value: ")inverted",
      buffer: "\u207B\u00B9",
      second: "\u1D07",
      secondValue: ")E("
    },
    {
      label: "(",
    },
    {
      label: ")",
    },
  ],

  right: [
    {
      label: "clear",
    },
    {
      label: "/",
    },
    {
      label: "*",
    },
    {
      label: "\uFE63",
      value: "-"
    },
    {
      label: "+",
    },
    {
      label: "=",
      value: "equals",
    },
  ],

  numbers: [
    {label: "7"}, {label: "8"}, {label: "9"},
    {label: "4"}, {label: "5"}, {label: "6"},
    {label: "1"}, {label: "2"}, {label: "3"}, 
    {label: "\u002D", value: "negate", second: "ANS"}, 
    {label: "0"}, {label: "."},
  ]
}

function ControlBuilder(calc) {

  /* Builds all of the calculator buttons and sections. */
  function buildControls() {
    const controlsDiv = document.querySelector("#controls");
    for (let section in controls) {
      // controls is a global variable so just pass the name of each section.
      // Attaches controls directly to the HTML node in index.
      controlsDiv.appendChild(buildSection(section));
    }
  }

  /* Build a section of the controls based on the section name. */
  function buildSection(section) {
    const sectionDiv = document.createElement("div");
    sectionDiv.id = section;
    for (let c of controls[section]) {
      sectionDiv.appendChild(makeButton(c));
    }
    return sectionDiv;
  }

  /**  
   * Make a button out of a control object.
   */
  function makeButton(control) {
    let button = document.createElement("button");
    button.id = control.value ? control.value : control.label;
    button.textContent = control.label;
    button.dataset.buffer = control.buffer ? control.buffer : "";
    button.dataset.secondLabel = control.second ? control.second: "";
    button.dataset.secondValue = 
      control.secondValue ? control.secondValue :
      control.second ? control.second :
      control.value ? control.value : control.label;
    button.dataset.secondBuffer = 
      control.secondBuffer ? control.secondBuffer : "";
    button.addEventListener("click", calc.keyHandler.bind(calc));
    return button;
  }
  
  buildControls();
}

export default ControlBuilder;
