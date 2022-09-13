// list of colors
const colors = [
  "rgb(255,0,0)", // red
  "rgb(255,153,0)", // orange
  "rgb(255,255,0)", // yellow
  "rgb(0,255,0)", // green
  "rgb(0,255,255)", // blue
  "rgb(0,0,255)", // dark blue
  "rgb(75,0,130)", // purple
  "rgb(148,0,211)", // dark purple
];

const colors_faded = [
  "rgb(234, 153, 153)", // red faded
  "rgb(249, 203, 156)", // orange faded
  "rgb(255, 229, 153)", // yellow faded
  "rgb(182, 215, 168)", // green faded
  "rgb(162, 196, 201)", // blue faded
  "rgb(159, 197, 232)", // dark blue faded
  "rgb(180, 167, 214)", // dark purple faded
  "rgb(213, 166, 189)", // purple faded
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

//keeps scrollbar bottom
var objDiv = document.getElementById("scrolling");
objDiv.scrollTop = objDiv.scrollHeight;

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
    sequence += child.textContent + ", ";
  }

  // slices last character from string
  sequence = sequence.slice(0, -2);

  // placing our string in database (not yet implemented)
  sequencehtml.value = sequence;
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

function updateHTML(x) {}

function highlight() {
  /* Function that sets cells in every list except the current one to 90% opacity
   *
   */
  for (var i = 0; i < grid.length; i++) {
    // loops through all cells in grid

    // if the cell is at the current element set it to the current color
    if (elements.textContent.includes(grid[i].textContent)) {
      // sets the color of the cell out of color list
      grid[i].style.background = colors[elementnumber % colors.length];

      // if the cell is in any other list set it to faded color at its index
    } else if (
      elementshtml.textContent.includes(" " + grid[i].textContent + " ")
    ) {
      // finds the last list index that the cell was in
      let list = elementshtml.getElementsByTagName("li");
      let index = 0;
      sequencehtml.value = list[0].textContent;
      for (var j = list.length - 1; j >= 0; j--) {
        if (list[j].textContent.includes(grid[i].textContent)) {
          index = j;
          break;
        }
      }

      grid[i].style.background = colors_faded[index % colors.length];
    }
  }
}
