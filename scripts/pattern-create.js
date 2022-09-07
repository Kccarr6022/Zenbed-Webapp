const colors = [
  "#ff0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

let elementshtml = document.getElementById("list-of-elements"); // list of elements in html document
let sequencehtml = document.getElementById("sequence"); // sequence in html document
let elements = document.createElement("li");
elements.setAttribute("onclick", "editElements(this)");
let elementnumber = 0;
let sequence = "";
elementshtml.appendChild(elements);

window.addEventListener("keydown", checkKeyPress, false);
list.onclick = editElements(this);

function theFunction(x) {
  // Function for when square is clicked

  x.style.background = colors[elementnumber % colors.length];
  elements.appendChild(document.createTextNode(x.textContent + " "));
  sequence += " " + x.textContent;
}

function checkKeyPress(key) { // Function for when enter is pressed
 /*
  
 */
  if (key.keyCode == "13" || key.keyCode == "16") {
    elements = document.createElement("li");
    elements.setAttribute("onclick", "editElements(this)");
    elementshtml.appendChild(elements);
    elementnumber++;
    sequence += ",";
  }
}

function savePattern() {
  sequencehtml.innerHTML = sequence;
}

function editElements(x) {
  sequencehtml.innerHTML = x.textContent;
}
