// TODO: initialize board
// TODO: generate mines on first click
// TODO: redo Cell component to deal with all cases
// TODO: add click functionality to Cell
// TODO: style cells

function resetField(setGameState) {
  setGameState("reset");
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

export { resetField };

export default Field;
