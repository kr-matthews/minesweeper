// TODO: initialize board
// TODO: generate mines on first click
// TODO: redo Cell component to deal with all cases
// TODO: add click functionality to Cell
// TODO: style cells

function skeletonField(rows, columns) {
  let new_field = [];
  for (var i = 0; i < rows; i++) {
    // create a new row in the field
    let new_row = [];
    for (var j = 0; j < columns; j++) {
      // create a new cell in the row
      new_row.push({ state: "hide" });
    }
    new_field.push(new_row);
  }
  return new_field;
}

function resetField(inputs, setMineCount, setGameState, setField) {
  let { rows, columns, mines } = inputs;
  setGameState("reset");
  setMineCount(mines);
  // create a new field with no data (wait until first click)

  setField(skeletonField(rows, columns));
}

function Cell({ args }) {
  let { hasMine, state, adjCount, gameState } = args;
  return (
    // TODO: change classname to not give away mine locations
    <td className={"cell " + hasMine + " " + state + " " + gameState}>
      {state === "show" ? (hasMine ? "M" : adjCount) : state}
    </td>
  );
}

function Field({ args }) {
  let { field, gameState } = args;
  return (
    <table className="field">
      <tbody>
        {field.map((row, row_ind) => {
          return (
            <tr key={row_ind}>
              {row.map((cellData, col_ind) => {
                return <Cell key={col_ind} args={{ ...cellData, gameState }} />;
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
