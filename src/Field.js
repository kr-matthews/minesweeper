import Cell from "./Cell.js";

import {
  skeletonField,
  generateMines,
  getNeighbours,
} from "./generateField.js";

function resetField(
  inputs,
  setMineCount,
  setRevealCount,
  setFlagCount,
  setGameState,
  setField,
  handleReset
) {
  let { rows, columns, mines } = inputs;
  setGameState("reset");
  setMineCount(mines);
  setRevealCount(0);
  setFlagCount(0);
  handleReset();
  // create a new field with no data (wait until first click)
  setField(skeletonField(rows, columns));
}

// have stack of cells (any state and any hasMine)
// reveal if hidden;
// and if it isn't a mine and adjCount is 0, then add all neighbours to stack
function cascadeReveal(
  stack,
  setRevealCount,
  setGameState,
  field,
  setField,
  handleStop
) {
  while (stack.length > 0) {
    let [r, c] = stack.pop();
    // otherwise already processed it earlier in the stack
    if (field[r][c].state === "hide") {
      // reveal it
      let newField = [...field];
      newField[r][c].state = "show";
      setField(newField);
      if (field[r][c].hasMine) {
        // ... and  trigger loss
        setGameState("lost");
        handleStop();
      } else {
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
}

// reveal all non-flagged, adj cells
function revealNonFlagNeighbours(
  r,
  c,
  setRevealCount,
  setGameState,
  field,
  setField,
  handleStop
) {
  let [m, n] = [field.length, field[0].length];
  cascadeReveal(
    getNeighbours(r, c, m, n),
    setRevealCount,
    setGameState,
    field,
    setField,
    handleStop
  );
}

// check if adj flag count is equal to adj mine count
function adjFlagSurplus(r, c, field) {
  let [m, n] = [field.length, field[0].length];
  return (
    getNeighbours(r, c, m, n).filter(([r0, c0]) => {
      return field[r0][c0].state === "flag";
    }).length - field[r][c].adjCount
  );
}

function Field({ args }) {
  let {
    mineCount,
    setRevealCount,
    setFlagCount,
    gameState,
    setGameState,
    field,
    setField,
    handleStart,
    handleStop,
    usingQs,
    usingWarnings,
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
                      setFlagCount,
                      gameState,
                      setGameState,
                      field,
                      setField,
                      handleStart,
                      handleStop,
                      usingWarnings,
                      usingQs,
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

// for Cell.js
export {
  generateMines,
  cascadeReveal,
  adjFlagSurplus,
  revealNonFlagNeighbours,
};

export default Field;
