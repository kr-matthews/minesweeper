// TODO: redo Cell component to deal with all cases
// TODO: style cells

import {
  skeletonField,
  generateMines,
  getNeighbours,
} from "./generateField.js";

function resetField(
  inputs,
  setMineCount,
  setRevealCount,
  setGameState,
  setField
) {
  let { rows, columns, mines } = inputs;
  setGameState("reset");
  setMineCount(mines);
  setRevealCount(0);
  // create a new field with no data (wait until first click)
  setField(skeletonField(rows, columns));
}

// have stack of hidden, non-mine cells
// reveal each, and if adjCount is 0, add all neighbours to stack
function cascadeReveal(stack, setRevealCount, field, setField) {
  while (stack.length > 0) {
    let [r, c] = stack.pop();
    // otherwise already processed it earlier in the stack
    if (field[r][c].state === "hide") {
      // reveal it
      let newField = [...field];
      newField[r][c].state = "show";
      setField(newField);
      // update revealCount
      setRevealCount((revealCount) => revealCount + 1);
      // if it's adjCount is 0, add hidden neighbours to stack
      if (field[r][c].adjCount === 0) {
        getNeighbours(r, c, field.length, field[0].length).forEach(
          ([r0, c0]) => {
            if (field[r0][c0].state === "hide") {
              stack.push([r0, c0]);
            }
          }
        );
      }
    }
  }
}

function handleClick(
  rowInd,
  colInd,
  mineCount,
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
  // now reveal the cell and perform other actions as necessary
  if (cell.hasMine) {
    // just lost: reveal current cell...
    let newField = [...field];
    newField[rowInd][colInd].state = "show";
    setField(newField);
    // ... and  trigger loss
    setGameState("lost");
  } else if (cell.state === "hide") {
    // no mine: reveal cell, and iterate on any neighbours with 0 adj mines
    cascadeReveal([[rowInd, colInd]], setRevealCount, field, setField);
    // there is a useEffect to check when the game is won
  }
}

// always return a button, style it differently based on classname
// won't act like a button sometimes
function Cell({ args }) {
  let {
    rowInd,
    colInd,
    hasMine,
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
