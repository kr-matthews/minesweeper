function skeletonField(rows, columns) {
  let new_field = [];
  for (var i = 0; i < rows; i++) {
    // create a new row in the field
    let new_row = [];
    for (var j = 0; j < columns; j++) {
      // create a new cell in the row
      new_row.push({ state: "hide" });
    }
    new_field.push(new_row);
  }
  return new_field;
}

// conceptually: put all the mines in the first n cells
//  and then shuffle the field by, one at a time, swapping each cell
//  with a cell after it
function generateMines() {
  // TODO:
  console.log("I am generating mines.");
  // place mines in first mineCount cells
  placeMinesAtStart();
  shuffleMines();
}

function placeMinesAtStart() {
  // TODO:
}

function shuffleMines() {
  // TODO:
}

export { skeletonField, generateMines };
