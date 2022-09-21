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

function buildControls() {
  const controlsDiv = document.querySelector("#controls");
  for (let section in controls) {
    controlsDiv.appendChild(buildSection(section));
  }
}

function buildSection(section) {
  const sectionDiv = document.createElement("div");
  sectionDiv.id = section;
  for (let c of controls[section]) {
    sectionDiv.appendChild(makeButton(c.label, c.second, c.id));
  }
  return sectionDiv;
}

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
