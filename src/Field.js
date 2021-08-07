// TODO: unfinished function definitions tagged with todo
// TODO: redo Cell component to deal with all cases
// TODO: style cells

import { skeletonField, generateMines } from "./generateField.js";

function resetField(inputs, setMineCount, setGameState, setField) {
  let { rows, columns, mines } = inputs;
  setGameState("reset");
  setMineCount(mines);
  // create a new field with no data (wait until first click)
  setField(skeletonField(rows, columns));
}

function unhideCascade() {
  // TODO:
  console.log("I am doing a cascade.");
}

function presentWin() {
  // TODO:
  console.log("I am presenting a win.");
}

function presentLoss() {
  // TODO:
  console.log("I am presenting a loss");
}

// TODO: setup state for revealed squares, then can check if +mineCount=size
// but be careful about checking game isn't lost
function won() {
  // TODO:
  console.log("I am checking a potential win.");
  return false;
}

function handleClick(
  row_ind,
  col_ind,
  mineCount,
  gameState,
  setGameState,
  field,
  setField
) {
  let cell = field[row_ind][col_ind];
  // generate the mines if this is the first click
  if (gameState === "reset") {
    setGameState("ongoing");
    generateMines(row_ind, col_ind, mineCount, field, setField);
  }
  // reveal current cell, and recurse or trigger loss
  if (cell.state === "hide" && !cell.hasMine) {
    // reveal cell, and recurse on any neighbours with 0 adj mines
    unhideCascade([[row_ind, col_ind]], field, setField);
  } else if (cell.state === "hide" && cell.hasMine) {
    // just lost
    setGameState("lost");
    presentLoss(field, setField);
  }
  // check whether they just won
  if (won(field)) {
    setGameState("won");
    presentWin(field, setField);
  }
}

// always return a button, style it differently based on classname
// won't act like a button sometimes
function Cell({ args }) {
  let {
    row_ind,
    col_ind,
    hasMine,
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
            row_ind,
            col_ind,
            mineCount,
            gameState,
            setGameState,
            field,
            setField
          )
        }
      >
        {state === "show" ? (hasMine ? "M" : adjCount) : state}
      </button>
    </td>
  );
}

function Field({ args }) {
  let { mineCount, gameState, setGameState, field, setField } = args;
  return (
    <table className="field">
      <tbody>
        {field.map((row, row_ind) => {
          return (
            <tr key={row_ind}>
              {row.map((cellData, col_ind) => {
                return (
                  <Cell
                    key={col_ind}
                    args={{
                      ...cellData,
                      row_ind,
                      col_ind,
                      mineCount,
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
