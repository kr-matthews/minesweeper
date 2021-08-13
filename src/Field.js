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

function handleLeftClick(
  r,
  c,
  mineCount,
  setRevealCount,
  gameState,
  setGameState,
  field,
  setField
) {
  // don't do anything if the game is over
  if (gameState === "won" || gameState === "lost") {
    return;
  }
  let cell = field[r][c];
  // generate the mines if this is the first click
  if (gameState === "reset" && cell.state === "hide") {
    setGameState("ongoing");
    generateMines(r, c, mineCount, field, setField);
  }
  // now gameState is ongoing
  // now reveal the cell and perform other actions as necessary
  if (cell.state === "hide" && cell.hasMine) {
    // just lost: reveal current cell...
    let newField = [...field];
    newField[r][c].state = "show";
    setField(newField);
    // ... and  trigger loss
    setGameState("lost");
  } else if (cell.state === "hide") {
    // no mine: reveal cell, and iterate on any neighbours with 0 adj mines
    cascadeReveal([[r, c]], setRevealCount, setGameState, field, setField);
    // there is a useEffect to check when the game is won
  } else if (cell.state === "show" && hasFullFlags(r, c, field)) {
    revealNonFlagNeighbours(
      r,
      c,
      setRevealCount,
      setGameState,
      field,
      setField
    );
  }
}

function handleRightClick(e, r, c, gameState, field, setField) {
  e.preventDefault();
  // don't do anything if the game is over
  if (gameState === "won" || gameState === "lost") {
    return;
  }
  let cell = field[r][c];
  if (cell.state === "hide") {
    setField((prev) => {
      let newField = [...prev];
      newField[r][c].state = "flag";
      return newField;
    });
  } else if (cell.state === "flag") {
    setField((prev) => {
      let newField = [...prev];
      newField[r][c].state = "hide";
      return newField;
    });
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
          handleLeftClick(
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
        onContextMenu={(e) =>
          handleRightClick(e, rowInd, colInd, gameState, field, setField)
        }
      >
        {/* TEMP: should be "show" not "hide" */}
        {state === "show" && (hasMine ? "M" : adjCount)}
        {state === "flag" && "!!!!"}
        {/* hasMine ? "M" : adjCount */}
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
