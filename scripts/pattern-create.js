// list of colors
const colors = [
  "rgb(255,0,0)",
  "rgb(255,127,0)",
  "rgb(255,255,0)",
  "rgb(0,255,0)",
  "rgb(0,0,255)",
  "rgb(75,0,130)",
  "#rgb(148,0,211)",
];

// variable initialization
let elementnumber = 0;
let currentlist = 0;

// variables to edit document
let elementshtml = document.getElementById("list-of-elements"); // list of elements in html document
let sequencehtml = document.getElementById("sequence"); // sequence in html document
let grid = document.getElementsByClassName("grid-item"); // grid of cells in html document

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

  if (elements.textContent.includes(x.textContent)) {
    // checks if the cell is already filled

    // if the cell is already in the list then remove it
    elements.textContent = elements.textContent.replace(x.textContent, "");

    // set color to default
    x.style.background = "white";
  } else {
    // checks if the cell isnt already in the list then append

    // chages the color of the cell
    x.style.background = colors[elementnumber % colors.length];

    // appends it to the current element
    elements.appendChild(document.createTextNode(x.textContent + " "));
  }

  savePattern();
}

function checkKeyPress(key) {
  /* Checks if enter key is pressed. If enter is pressed then the function increments a new list
   * of elements and sets it to bold while setting the old list to normal.
   */

  // checks if enter or shift key is pressed
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

    highlight(); // function to set all other cells to 90% opacity
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

  // slices last character from string
  sequence = sequence.slice(0, -1);

  // placing our string in database (not yet implemented)
  sequencehtml.innerHTML = sequence;
}

function editElements(x) {
  /* Function triggered when clicking on elements list. Will allow you to edit that list clicked on
   *
   */

  // sets element number to current
  elementnumber = -1;
  for (const child of elementshtml.children) {
    elementnumber++;
    if (child == x) {
      break;
    }
  }

  // clears boldness in lists
  for (const child of elementshtml.children) {
    child.style.fontWeight = "normal";
  }

  // sets the current list to bold
  x.style.fontWeight = "bold";

  // sets list being edited to current
  elements = x;

  highlight(); // function to set all other cells to 90% opacity
}

function highlight() {
  /* Function that sets cells in every list except the current one to 90% opacity
   *
   */
  for (var i = 0; i < grid.length; i++) {
    // loops through all cells in grid

    // if the cell is in the current list then set opacity to 100% rgb(255, 255, 255)
    if (grid[i].style.background == "rgb(255, 255, 255)") {
      grid[i].style.opacity = "100%";
    } else if (
      grid[i].style.background == colors[elementnumber % colors.length]
    ) {
      grid[i].style.opacity = "100%";
    } else {
      // else set opacity to 90%
      grid[i].style.opacity = "75%";
    }

    sequencehtml.innerHTML = grid[i].style.background;
  }
}
