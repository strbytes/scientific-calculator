/* List of all calculator controls, organized by section. */
const controls = {
  edit: [
    {
      label: "del",
      second: ""
    },
    {
      label: "<-",
      second: "",
      id: "back"
    },
    {
      label: "->",
      second: "",
      id: "forward"
    },
  ],

  left: [
    {
      id: "second",
      label: "2nd",
      second: ""
    },
    {
      label: "log",
      second: "10^"
    },
    {
      label: "ln",
      second: "e^"
    },
    {
      label: "pi",
      second: "e"
    },
    {
      label: "^",
      second: "x\u221A"
    },
    {
      label: "x\u00B2",
      second: "\u221A"
    },
  ],

  top: [
    {
      label: "sin",
      second: "sin\u207B"
    },
    {
      label: "cos",
      second: "cos\u207B"
    },
    {
      label: "tan",
      second: "tan\u207B"
    },
    {
      label: "x\u207B\u00B9",
      second: "\u1D07"
    },
    {
      label: "(",
      second: ""
    },
    {
      label: ")",
      second: ""
    },
  ],

  right: [
    {
      label: "clear",
      second: ""
    },
    {
      label: "/",
      second: ""
    },
    {
      label: "*",
      second: ""
    },
    {
      label: "-",
      second: ""
    },
    {
      label: "+",
      second: ""
    },
    {
      label: "=",
      second: ""
    },
  ],

  numbers: [
    {label: "7", second: ""}, {label: "8", second: ""},{label: "9", second: ""},
    {label: "4", second: ""}, {label: "5", second: ""},{label: "6", second: ""},
    {label: "1", second: ""}, {label: "2", second: ""},{label: "3", second: ""},
    {label: "-", second: ""}, {label: "0", second: ""},{label: ".", second: ""},
  ]
}

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
    // id is only used for the '2nd' button, since 2nd is not a valid node ID
    sectionDiv.appendChild(makeButton(c.label, c.second, c.id));
  }
  return sectionDiv;
}

/**  
 * Make a button out of the provided info.
 * label - Used to create the visible text for the button as well as its ID.
 * second - Stores the secondary command for the button in a data attribute.
 * id - If present, use this for the id instead. For values where the label is 
 * an illegal value for an ID.
 */
function makeButton(label, second, id) {
  let button = document.createElement("button");
  button.id = id? id : label;
  button.textContent = label;
  button.dataset.second = second;
  button.addEventListener("click", keyHandler);
  return button;
}

function keyHandler(e) {
  // TODO implement buffer
  buffer.append(e.target.id)
}

export default buildControls;
