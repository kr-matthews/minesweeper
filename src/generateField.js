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
//  (clicked cell should be a 0 if possible)
function generateMines(rowInd, colInd, mineCount, field, setField) {
  let [m, n] = [field.length, field[0].length];
  let cellCount = m * n;
  let adjCellCount = getNeighbours(rowInd, colInd, m, n).length;
  // how many mines must bleed into the cells adj to clicked
  // set this to 0 to dynamically enforce max mineCount so click is always 0
  let excessMines = Math.max(0, mineCount - (cellCount - (adjCellCount + 1)));
  // generate shuffled array for mine locations of non-adjacent cells
  let nonClickAdjArr = generateShuffledMineArray(
    cellCount - (adjCellCount + 1),
    mineCount - excessMines
  );
  // generate shuffled array for mine locations of adjacent cells
  let clickAdjArr = generateShuffledMineArray(adjCellCount, excessMines);
  // add mines to actual field state using those two arrays
  mineArraysToField(
    rowInd,
    colInd,
    nonClickAdjArr,
    clickAdjArr,
    field,
    setField
  );
  // assign arj counts based on newly placed mines
  assignAdjCounts(field, setField);
}

// shuffled array of length len with max(mines,len) mines
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

function mineArraysToField(
  rowInd,
  colInd,
  nonClickAdjArr,
  clickAdjArr,
  field,
  setField
) {
  let newField = [...field];
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      if (r === rowInd && c === colInd) {
        // this is the clicked cell, no mine here
        newField[r][c].hasMine = false;
      } else if (isNeighbour(r, c, rowInd, colInd)) {
        // this is adj to clicked cell, so sample from adj arr
        newField[r][c].hasMine = clickAdjArr.pop();
      } else {
        // this is not adj, so sample from non-adj arr
        newField[r][c].hasMine = nonClickAdjArr.pop();
      }
    }
  }
  setField(newField);
}

function isNeighbour(r, c, r0, c0) {
  let d1 = Math.abs(r - r0);
  let d2 = Math.abs(c - c0);
  return d1 <= 1 && d2 <= 1 && d1 + d2 > 0;
}

function assignAdjCounts(field, setField) {
  let newField = [...field];
  for (let r = 0; r < field.length; r++) {
    for (let c = 0; c < field[0].length; c++) {
      // count the mines adj to [r,c] (not including itself)
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
  return (
    directions
      .map(([dr, dc]) => [r + dr, c + dc])
      // check whether the potential neighbour is in the field bounds
      .filter(([r0, c0]) => 0 <= r0 && r0 < m && 0 <= c0 && c0 < n)
  );
}

// inclusive of end-points
function getRandomInt(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export { skeletonField, generateMines, getNeighbours };

// testing

//export { getNeighbours };
