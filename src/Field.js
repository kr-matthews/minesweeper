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

// have stack of cells (any state and any hasMine)
// reveal if hidden;
// and if it isn't a mine and adjCount is 0, then add all neighbours to stack
function cascadeReveal(stack, setRevealCount, setGameState, field, setField) {
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
  setField
) {
  let [m, n] = [field.length, field[0].length];
  cascadeReveal(
    getNeighbours(r, c, m, n),
    setRevealCount,
    setGameState,
    field,
    setField
  );
}

// check if adj flag count is equal to adj mine count
function hasFullFlags(r, c, field) {
  let [m, n] = [field.length, field[0].length];
  return (
    field[r][c].adjCount ===
    getNeighbours(r, c, m, n).filter(([r0, c0]) => {
      return field[r0][c0].state === "flag";
    }).length
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

// for Cell.js
export { generateMines, cascadeReveal, hasFullFlags, revealNonFlagNeighbours };

export default Field;
