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
let elementnumber = 0; // list index at moment

// variables to edit document
let elementshtml = document.getElementById("list-of-elements"); // list of elements in html document
let sequencehtml = document.getElementById("sequence"); // sequence in html document
let grid = document.getElementsByClassName("grid-item"); // grid of cells in html document
// VARIABLES

// DOCUMENT SETUP
let elements = document.createElement("li"); // current list
let deletebutton = document.createElement("button");

// attrbutes for elements
elements.setAttribute("onclick", "editElements(this)");
elements.style.fontWeight = "bold";

// attributes for delete button
deletebutton.setAttribute("onclick", "deleteElement(this)");
deletebutton.textContent = "X";

// appends the delete element button
elements.appendChild(deletebutton);

//appends the list to html document
elementshtml.appendChild(elements);

// On click listeners
window.addEventListener("keydown", checkKeyPress, false);
elements.onclick = editElements(this);

//keeps scrollbar bottom
var objDiv = document.getElementById("scrolling");
objDiv.scrollTop = objDiv.scrollHeight;
// DOCUMENT SETUP

// FUNCTIONS
function cellClicked(cell) {
  /*  Function for when the user clicks on a cell in the grid
   *
   */

  // checks if the cell is already filled
  if (elements.textContent.includes(cell.textContent)) {
    // if the cell is already in the list then remove it
    elements.innerHTML = elements.innerHTML.replace(cell.textContent, "");
    cell.style.removeProperty("background");
  } else {
    // appends cell to the current element
    elements.appendChild(document.createTextNode(cell.textContent + " "));
    cell.style.background = colors[elementnumber];
  }

  patternToText();
}

function checkKeyPress(key) {
  /* Function to route key presses to the correct function
   * 
   */

  // checks if enter or shift key is pressed
  if (key.keyCode == "13" || key.keyCode == "16") {
    nextElement();
  }

  PatternToText();
}

function nextElement() {
  /* Function for creating a new element in the list
    *
    */

  // sets old list to normal font weight
  elements.style.fontWeight = "normal";

  // creates new list, makes it clickable, and sets it to bold
  elements = document.createElement("li");
  deletebutton = document.createElement("button");
  deletebutton.textContent = "X";
  deletebutton.setAttribute("onclick", "deleteElement(this)");
  elements.setAttribute("onclick", "editElements(this)");
  elements.style.fontWeight = "bold";

  elements.appendChild(deletebutton);

  // appends the list to html document based on element number
  if (elementnumber == elementshtml.children.length - 1) {
    elementshtml.appendChild(elements);
  } else {
    elementshtml.insertBefore(
      elements,
      elementshtml.children[elementnumber + 1]
    );
  }

  // adds coma to sequence and increments elementnumber
  elementnumber++;
  drawGrid();
}

function editElements(element) {
  /* Function triggered when clicking on elements list. Will allow you to edit that list clicked on
   *
   */

  // does not trigger with the delete button
  if (element.textContent == "X") {
    return;
  }

  if (element.style.fontWeight == "bold") {
    element.style.fontWeight = "normal";
    elementnumber = -1;
  } else {
    // if the element is not selected then select it

    // sets element number to current
    elementnumber = -1;
    for (const child of elementshtml.children) {
      elementnumber++;
      if (child == element) {
        break;
      }
    }

    // clears boldness in lists
    for (const child of elementshtml.children) {
      child.style.fontWeight = "normal";
    }

    // sets the current list to bold
    element.style.fontWeight = "bold";

    // sets list being edited to current
    elements = element;

    drawGrid(); // function to set all other cells to 90% opacity
  }
}

function deleteElement(thisElement) {
  /* Function triggered when clicking on delete button. Will delete the element clicked on
   *
   */

  thisElement.parentNode.remove();
  thisElement.innerHTML = "";

  for (const i in elementshtml.children) {
    if (elementshtml.children[i] == thisElement.parentNode) {
      elementnumber = i;
      break;
    }
  }

  elementnumber--;
  editElements(elementshtml.children[elementnumber]);
  patternToText();
  drawGrid(); // function to set all other cells to 90% opacity
}

function textToPattern() {
  /* Function for taking the text in the sequence box and converting it to a pattern
   *
   */

  elementshtml.innerHTML = "";
  elements.innerHTML = "";
  elementnumber = -1;
  nextElement();
  for (var i = 0; i < sequencehtml.value.length; i++) {
    if (sequencehtml.value[i] == ",") {
      nextElement();
    } else {
      elements.appendChild(document.createTextNode(sequencehtml.value[i]));
    }
  }
  drawGrid();
}

function patternToText() {
  /* Function for saving the pattern into AWS RDS database by creating a new pattern row
   *
   */

  sequencehtml.value = "";
  // initializing string
  let sequence = "";

  // loops through all the lists and appends them to the sequence
  for (const child of elementshtml.children) {
    sequence += (child.textContent + ", ").replace("X", "");
  }

  // slices last character from string
  sequence = sequence.slice(0, -2);

  // placing our string in database (not yet implemented)
  sequencehtml.value = sequence;
}

function drawGrid() {
  /* Function that sets cells in every list except the current one to 90% opacity
   *
   */

  // loops through all cells in grid
  for (var i = 0; i < grid.length; i++) {
    // if the cell is at the current element set it to the current color
    if (elements.textContent.includes(grid[i].textContent + " ")) {
      // sets the color of the cell out of color list
      grid[i].style.background = colors[elementnumber % colors.length];

      // if the cell is in any other list set it to faded color at its index
    } else if (elementshtml.textContent.includes(grid[i].textContent + " ")) {
      // finds the last list index that the cell was in
      let list = elementshtml.getElementsByTagName("li");
      let index = 0;
      for (var j = list.length - 1; j >= 0; j--) {
        if (list[j].textContent.includes(grid[i].textContent + " ")) {
          index = j;
          break;
        }
      }

      grid[i].style.background = colors_faded[index % colors.length];
    } else {
      grid[i].style.removeProperty("background");
    }
  }
}
