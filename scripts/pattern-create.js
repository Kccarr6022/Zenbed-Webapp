const colors = [
  "#ff0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

let list = document.getElementById("list-of-elements");
let entry = document.createElement("li");
let index = 0;
list.appendChild(entry);

window.addEventListener("keydown", checkKeyPress, false);

function theFunction(x) {
  // Function for when square is clicked
  x.style.background = colors[index % colors.length];

  entry.appendChild(document.createTextNode(x.textContent + " "));
}

function checkKeyPress(key) {
  if (key.keyCode == "13" || key.keyCode == "16") {
    entry = document.createElement("li");
    list.appendChild(entry);
    index++;
  }
}
