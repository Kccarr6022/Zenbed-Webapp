const elements = document.getElementById("list-of-elements");
const colors = [
  "#ff0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
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
  // Function for when square is clicked
  x.style.background = colors[ index % colors.length];
  elements.textContent += " " + x.textContent;
  elements.textContent += str(x.style.background);
}
