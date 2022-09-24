/* List of all calculator controls, organized by section. */
const controls = {
  edit: [
    {
      label: "del",
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
      second: "10^",
    },
    {
      label: "ln",
      second: "e^"
    },
    {
      label: "\u03c0",
      value: "pi",
      second: "e"
    },
    {
      label: "^",
      value: "exponent",
      second: "\u02E3\u221A",
      secondValue: "xrt"
    },
    {
      label: "x\u00B2",
      value: "square",
      buffer: "\u00B2",
      second: "\u221A",
      secondValue: "sqrt"
    },
  ],

  top: [
    {
      label: "sin",
      second: "sin\u207B",
      secondValue: "sin-",
    },
    {
      label: "cos",
      second: "cos\u207B",
      secondValue: "cos-",
    },
    {
      label: "tan",
      second: "tan\u207B",
      secondValue: "tan-",
    },
    {
      label: "x\u207B\u00B9",
      value: "invert",
      buffer: "\u207B\u00B9",
      second: "\u1D07",
      secondValue: "E"
    },
    {
      label: "(",
      value: "open-paren",
    },
    {
      label: ")",
      value: "close-paren",
    },
  ],

  right: [
    {
      label: "clear",
    },
    {
      label: "/",
      value: "div",
    },
    {
      label: "*",
      value: "mul",
    },
    {
      label: "-",
      value: "sub",
    },
    {
      label: "+",
      value: "add",
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
    {label: "-", value: "negate", second: "ANS"}, 
    {label: "0"}, {label: ".", value: "decimal"},
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
    button.addEventListener("click", calc.keyHandler.bind(calc));
    return button;
  }
  
  buildControls();
}

export default ControlBuilder;
