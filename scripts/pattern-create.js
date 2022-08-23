const elements = document.getElementById("list-of-elements");
const colors = [
  "#00308F",
  "#004F98",
  "#6CA0DC",
  "#4682B4",
  "#4B9CD3",
  "#00308F",
  "#004F98",
  "#6CA0DC",
  "#4682B4",
  "#4B9CD3",
];
let index = 0;

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {
  if (key.keyCode == "13") {
    elements.textContent += ",";
    index++;
  }
}

function theFunction(x) {
  // when locatio is clicked

  x.style.background = colors[index];
  elements.textContent += " " + x.textContent;
}
