const colors = [
  "#ff0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

let elementshtml = document.getElementById("list-of-elements");
let sequencehtml = document.getElementById("sequence");
let elements = document.createElement("li");
let elementnumber = 0;
let sequence = "";
elementshtml.appendChild(elements);

window.addEventListener("keydown", checkKeyPress, false);

function theFunction(x) {
  // Function for when square is clicked
  x.style.background = colors[elementnumber % colors.length];
  elements.appendChild(document.createTextNode(x.textContent + " "));
  sequence += " " + x.textContent;
}

function checkKeyPress(key) {
  if (key.keyCode == "13" || key.keyCode == "16") {
    elements = document.createElement("li");
    elementshtml.appendChild(elements);
    elementnumber++;
    sequence += ",";
  }
}

function savePattern() {
  sequencehtml.innerHTML = sequence;
}
