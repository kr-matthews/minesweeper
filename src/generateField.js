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

// conceptually: put all the mines in the first n cells
//  and then shuffle the field by, one at a time, swapping each cell
//  with a random cell after it
// but also: make sure no mine in the clicked cell
function generateMines(rowInd, colInd, mineCount, field, setField) {
  console.log("I am generating mines.");
  // place mines in first mineCount cells
  placeMinesAtStart(rowInd, colInd, mineCount, field, setField);
  shuffleMines(rowInd, colInd, mineCount, field, setField);
  assignAdjCounts();
}

// put them in the first mineCount spots, but not [rowInd, colInd]
function placeMinesAtStart(rowInd, colInd, mineCount, field, setField) {
  let minesLeft = mineCount;
  let [r, c] = [0, 0];
  while (minesLeft > 0) {
    if (!(r === rowInd && c === colInd)) {
      // place mine
      let newField = [...field];
      newField[r][c].hasMine = true;
      setField(newField);
      minesLeft -= 1;
    }
    // advance
    [r, c] = updateIndices(r, c, field[0].length);
  }
}

// shuffle, but don't allow [rowInd, colInd] to get a mine
function shuffleMines(rowInd, colInd, mineCount, field, setField) {
  let [r, c] = [0, 0];
  while (r < field[0].length) {
    let [rSwap, cSwap] = getRandomLaterIndices(
      r,
      c,
      field.length,
      field[0].length,
      rowInd,
      colInd
    );
    // do the swap
    let newField = [...field];
    [newField[r][c].hasMine, newField[rSwap][cSwap].hasMine] = [
      newField[rSwap][cSwap].hasMine,
      newField[r][c].hasMine,
    ];
    setField(newField);
    // advance
    [r, c] = updateIndices(r, c, field[0].length);
  }
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

// avoid returning r0, c0
// unless r, c = r0, c0
function getRandomLaterIndices(r, c, n, m, r0, c0) {
  if (r === r0 && c === c0) {
    return [r, c];
  }
  let natInd = r * m + c;
  let forbiddenInt = r0 * m + c0;
  var randomLaterNatInd;
  do {
    randomLaterNatInd = getRandomInt(natInd, n * m - 1);
  } while (randomLaterNatInd === forbiddenInt);
  return [Math.floor(randomLaterNatInd / m), randomLaterNatInd % m];
}

function getRandomInt(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export { skeletonField, generateMines };

// for testing

export { updateIndices };
