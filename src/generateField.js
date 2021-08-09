function skeletonField(rows, columns) {
  let newField = [];
  for (var i = 0; i < rows; i++) {
    // create a new row in the field
    let newRow = [];
    for (var j = 0; j < columns; j++) {
      // create a new cell in the row
      newRow.push({ state: "hide" });
    }
    newField.push(newRow);
  }
  return newField;
}

// add mine locations to field, plus adj counts, given first click location
//  (no mine on clicked cell)
function generateMines(rowInd, colInd, mineCount, field, setField) {
  console.log("I am generating mines.");

  // generate shuffled array of field size - 1 with mineCount mines
  let arr = generateShuffledMineArray(
    field.length * field[0].length - 1,
    mineCount
  );
  // insert mine-free spot corresponding to clicked cell location
  insertNonMine(arr, rowInd * field[0].length + colInd);
  // add mines to field
  mineArrayToField(arr, field, setField);
  // use array to place mines in actual field
  assignAdjCounts();
  alert(
    "It only generates the random mine locations, you can't continue from here."
  );
}

function generateShuffledMineArray(len, mines) {
  let arr = [];
  // create sorted array with mines...
  for (let i = 0; i < len; i++) {
    if (i < mines) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  }
  // ... and then shuffle it
  return shuffle(arr);
}

function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swap_i = getRandomInt(i, arr.length - 1);
    [arr[i], arr[swap_i]] = [arr[swap_i], arr[i]];
  }
  return arr;
}

function insertNonMine(arr, ind) {
  arr.splice(ind, 0, false);
  return arr; // for testing
}

function mineArrayToField(arr, field, setField) {
  let newField = [...field];
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      newField[r][c].hasMine = arr[r * field[0].length + c];
    }
  }
  setField(newField);
  return field; // for testing
}

function assignAdjCounts() {
  // TODO:
}

function updateIndices(r, c, n) {
  if (c === n - 1) {
    return [r + 1, 0];
  } else {
    return [r, c + 1];
  }
}

// inclusive of end-points
function getRandomInt(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export { skeletonField, generateMines };

// for testing

export { updateIndices, insertNonMine };
