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

// On click listeners
window.addEventListener("keydown", checkKeyPress, false);
list.onclick = editElements(this);

function theFunction(x) {
  /*  Function for when the user clicks on a cell in the grid
   *
   */

  // chages the color of the cell
  x.style.background = colors[elementnumber % colors.length];

  // appends it to the current list element
  elements.appendChild(document.createTextNode(x.textContent + " "));

  // appends it to our sequence
  sequence += " " + x.textContent;
}

function checkKeyPress(key) {
  /* Checks if enter key is pressed. If enter is pressed then the function increments a new list
   * of elements and sets it to bold while setting the old list to normal.
   */
  if (key.keyCode == "13" || key.keyCode == "16") {
    // creates new list and makes it clickable
    elements = document.createElement("li");
    elements.setAttribute("onclick", "editElements(this)");

    // appends the list to html document
    elementshtml.appendChild(elements);

    // adds coma to sequence and increments elementnumber
    sequence += ",";
    elementnumber++;
  }
}

function savePattern() {
/* Function for saving the pattern into AWS RDS database by creating a new pattern row
 * 
 */
  sequencehtml.innerHTML = sequence;
}

function editElements(x) {
/* Function triggered when clicking on elements list. Will allow you to edit that list clicked on
 * 
 */
  
  // sets the list to bold
  x.style.fontWeight = "bold";
}
