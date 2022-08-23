const elements = document.getElementById("list-of-elements");

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {
  if (key.keyCode == "13") {
    elements.textContent += ",";
}
}


function theFunction(x) {// when locatio is clicked

  x.style.background = "#000000";
  elements.textContent += " " + x.textContent;
}
