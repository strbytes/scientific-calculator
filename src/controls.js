const controlsDiv = document.querySelector("#controls");
const numbers = [
  "7", "8", "9", "4", "5", "6", "1", "2", "3", "-", "0", ".",
]
const binary = ["^", "*", "/", "+", "-"]
const unary = ["sqrt", "log"]
const constants = ["pi", "e"]

function buildControls() {
  controlsDiv.appendChild(buildSection("numbers", numbers, 4));
}

function buildSection(sectionLabel, buttonLabels, rows) {
  const columns = buttonLabels.length / rows;
  console.assert(columns % 1 === 0);
  const sectionButtons = document.createElement("div");
  sectionButtons.id = sectionLabel;

  for (let r = 0; r < rows; r++) {
    let rowDiv = document.createElement("div");

    for (let c = 0; c < buttonLabels.length / rows; c++) {
      let button = makeButton(buttonLabels[r * columns + c]);
      rowDiv.appendChild(button);
    }
    
    sectionButtons.appendChild(rowDiv);
  }
  return sectionButtons;
}



function makeButton(label) {
  let button = document.createElement("button");
  button.textContent = label;
  button.id = label;
  return button;
}

export default buildControls;
