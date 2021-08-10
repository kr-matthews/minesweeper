const directions = [
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
];

function skeletonField(rows, columns) {
  let newField = [];
  for (var i = 0; i < rows; i++) {
    // create a new row in the field
    let newRow = [];
    for (var j = 0; j < columns; j++) {
      // create a new cell in the row
      newRow.push({ state: "hide", adjCount: 0 });
    }
    newField.push(newRow);
  }
  return newField;
}

// add mine locations and adj counts to field, given first click location
//  (no mine on clicked cell)
function generateMines(rowInd, colInd, mineCount, field, setField) {
  // generate shuffled array of field size - 1 with mineCount mines
  let arr = generateShuffledMineArray(
    field.length * field[0].length - 1,
    mineCount
  );
  // insert mine-free spot corresponding to clicked cell location
  insertNonMine(arr, rowInd * field[0].length + colInd);
  // add mines to actual field state
  mineArrayToField(arr, field, setField);
  // assign arj counts based on newly placed mines
  assignAdjCounts(field, setField);
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
}

function mineArrayToField(arr, field, setField) {
  let newField = [...field];
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      newField[r][c].hasMine = arr[r * field[0].length + c];
    }
  }
  setField(newField);
}

function assignAdjCounts(field, setField) {
  let newField = [...field];
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      getNeighbours(r, c, field.length, field[0].length).forEach(([r0, c0]) => {
        if (field[r0][c0].hasMine) {
          newField[r][c].adjCount += 1;
        }
      });
    }
  }
  setField(newField);
}

function getNeighbours(r, c, m, n) {
  return directions
    .map(([dr, dc]) => [r + dr, c + dc])
    .filter(([r0, c0]) => 0 <= r0 && r0 < m && 0 <= c0 && c0 < n);
}

// inclusive of end-points
function getRandomInt(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export { skeletonField, generateMines, getNeighbours };

// testing

//export { getNeighbours };
