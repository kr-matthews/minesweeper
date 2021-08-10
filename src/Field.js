// TODO: unfinished function definitions tagged with todo
// TODO: redo Cell component to deal with all cases
// TODO: style cells

import {
  skeletonField,
  generateMines,
  getNeighbours,
} from "./generateField.js";

function resetField(inputs, setMineCount, setGameState, setField) {
  let { rows, columns, mines } = inputs;
  setGameState("reset");
  setMineCount(mines);
  // create a new field with no data (wait until first click)
  setField(skeletonField(rows, columns));
}

// have stack of hidden, non-mine cells
// reveal each, and if adjCount is 0, add all neighbours to stack
function cascadeReveal(stack, setRevealCount, field, setField) {
  let newField = [...field];
  while (stack.length > 0) {
    let [r, c] = stack.pop();
    // reveal it
    newField[r][c].state = "show";
    setRevealCount((revealCount) => revealCount + 1);
    // if it's adjCount is 0, add neighbours to stack (unless alreadt seen)
    if (field[r][c].adjCount === 0) {
      getNeighbours(r, c, field.length, field[0].length).forEach(([r0, c0]) => {
        if (newField[r0][c0].state === "hide") {
          stack.push([r0, c0]);
        }
      });
    }
  }
}

// TODO: setup state for revealed squares, then can check if +mineCount=size
// but be careful about checking game isn't lost
function won(mineCount, revealCount, gameState, field) {
  return (
    gameState === "ongoing" &&
    revealCount + mineCount === field.length * field[0].length
  );
}

function handleClick(
  rowInd,
  colInd,
  mineCount,
  revealCount,
  setRevealCount,
  gameState,
  setGameState,
  field,
  setField
) {
  let cell = field[rowInd][colInd];
  // generate the mines if this is the first click
  if (gameState === "reset") {
    setGameState("ongoing");
    generateMines(rowInd, colInd, mineCount, field, setField);
  }
  if (cell.hasMine) {
    // just lost: reveal current cell, and  trigger loss
    let newField = [...field];
    newField[rowInd][colInd].state = "show";
    setField(newField);
    setGameState("lost");
  } else if (cell.state === "hide" && !cell.hasMine) {
    // reveal cell, and recurse on any neighbours with 0 adj mines
    cascadeReveal([[rowInd, colInd]], setRevealCount, field, setField);
  }
  // check whether they just won
  if (won(mineCount, revealCount, gameState, field)) {
    setGameState("won");
  }
}

// always return a button, style it differently based on classname
// won't act like a button sometimes
function Cell({ args }) {
  let {
    rowInd,
    colInd,
    hasMine,
    revealCount,
    setRevealCount,
    state,
    adjCount,
    mineCount,
    gameState,
    setGameState,
    field,
    setField,
  } = args;
  return (
    <td className="cell">
      <button
        type="button"
        className="clickable todo"
        onClick={() =>
          handleClick(
            rowInd,
            colInd,
            mineCount,
            revealCount,
            setRevealCount,
            gameState,
            setGameState,
            field,
            setField
          )
        }
      >
        {/* TEMP: should be "show" not "hide" */}
        {state === "show" ? (hasMine ? "M" : adjCount) : state}
      </button>
    </td>
  );
}

function Field({ args }) {
  let {
    mineCount,
    revealCount,
    setRevealCount,
    gameState,
    setGameState,
    field,
    setField,
  } = args;
  return (
    <table className="field">
      <tbody>
        {field.map((row, rowInd) => {
          return (
            <tr key={rowInd}>
              {row.map((cellData, colInd) => {
                return (
                  <Cell
                    key={colInd}
                    args={{
                      ...cellData,
                      rowInd,
                      colInd,
                      mineCount,
                      revealCount,
                      setRevealCount,
                      gameState,
                      setGameState,
                      field,
                      setField,
                    }}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export { resetField, skeletonField };

export default Field;
