// list of colors
const colors = [
  "#ff0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

// variable initialization
let elementnumber = 0;
let currentlist = 0;

// variables to edit document
let elementshtml = document.getElementById("list-of-elements"); // list of elements in html document
let sequencehtml = document.getElementById("sequence"); // sequence in html document

// creates editable list of elements, adds clickable attribute, and sets bold
let elements = document.createElement("li");
elements.setAttribute("onclick", "editElements(this)");
elements.style.fontWeight = "bold";

//appends the list to html document
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

  // appends it to the current element
  elements.appendChild(document.createTextNode(x.textContent + " "));
}

function checkKeyPress(key) {
  /* Checks if enter key is pressed. If enter is pressed then the function increments a new list
   * of elements and sets it to bold while setting the old list to normal.
   */
  if (key.keyCode == "13" || key.keyCode == "16") {
    // sets old list to normal font weight
    elements.style.fontWeight = "normal";

    // creates new list, makes it clickable, and sets it to bold
    elements = document.createElement("li");
    elements.setAttribute("onclick", "editElements(this)");
    elements.style.fontWeight = "bold";

    // appends the list to html document
    elementshtml.appendChild(elements);

    // adds coma to sequence and increments elementnumber
    elementnumber++;
  }
}

function savePattern() {
  /* Function for saving the pattern into AWS RDS database by creating a new pattern row
   *
   */

  // initializing string
  let sequence = "";

  // loops through all the lists and appends them to the sequence
  for (const child of elementshtml.children) {
    sequence += child.textContent + ",";
  }

  // placing our string in database (not yet implemented)
  sequencehtml.innerHTML = sequence;
}

function editElements(x) {
  /* Function triggered when clicking on elements list. Will allow you to edit that list clicked on
   *
   */
  // clears boldness in lists
  for (const child of elementshtml.children) {
    child.style.fontWeight = "normal";
  }

  // sets the current list to bold
  x.style.fontWeight = "bold";

  // sets list being edited to current
  elements = x;

  // sets element number accordingly
  elementnumber = elementshtml.
}
