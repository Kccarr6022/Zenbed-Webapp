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

let elements = document.createElement("li");
let deletebutton = document.createElement("button");

// attrbutes for elements
elements.setAttribute("onclick", "editElements(this)");
elements.style.fontWeight = "bold";

// attributes for delete button
deletebutton.setAttribute("onclick", "deleteElements(this)");
deletebutton.textContent = "X";

// appends the delete element button
elements.appendChild(deletebutton);

//appends the list to html document
elementshtml.appendChild(elements);

// On click listeners
window.addEventListener("keydown", checkKeyPress, false);
list.onclick = editElements(this);

//keeps scrollbar bottom
var objDiv = document.getElementById("scrolling");
objDiv.scrollTop = objDiv.scrollHeight;

function cellClicked(cell) {
  /*  Function for when the user clicks on a cell in the grid
   *
   */

  if (elements.textContent.includes(cell.textContent)) {
    // checks if the cell is already filled

    // if the cell is already in the list then remove it
    elements.innerHTML = elements.innerHTML.replace(cell.textContent, "");

    // set color to default
    cell.style.background = "white";
  } else {
    // checks if the cell isnt already in the list then append

    // chages the color of the cell
    cell.style.background = colors[elementnumber % colors.length];

    // appends it to the current element
    elements.appendChild(document.createTextNode(cell.textContent + " "));
  }

  savePattern();
}

function checkKeyPress(key) {
  /* Checks if enter key is pressed. If enter is pressed then the function increments a new list
   * of elements and sets it to bold while setting the old list to normal.
   */

  // checks if enter or shift key is pressed
  if (key.keyCode == "13" || key.keyCode == "16") {
    nextElement();
  }

  highlight(); // function to set all other cells to 90% opacity
}

function nextElement() {
  // sets old list to normal font weight
  elements.style.fontWeight = "normal";

  // creates new list, makes it clickable, and sets it to bold
  elements = document.createElement("li");
  deletebutton = document.createElement("button");
  deletebutton.textContent = "X";
  deletebutton.setAttribute("onclick", "deleteElements(this)");
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
}

function savePattern() {
  /* Function for saving the pattern into AWS RDS database by creating a new pattern row
   *
   */

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

function editElements(x) {
  /* Function triggered when clicking on elements list. Will allow you to edit that list clicked on
   *
   */

  //if delete button is clicked then dont do anything
  if (x.target.nodeName == "BUTTON") {
    return;
  }
  // if the element is already selected then deselect it
  if (x.style.fontWeight == "bold") {
    x.style.fontWeight = "normal";
    elementnumber = -1;
  } else {
    // if the element is not selected then select it

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
}

function deleteElements(thiselement) {
  /* Function triggered when clicking on delete button. Will delete the element clicked on
   *
   */

  // deletes the element from the list
  thiselement.parentNode.remove();

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
      grid[i].style.background = "white";
    }
  }
}
