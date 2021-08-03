function Cell({ args }) {
  let { mine, number, state, gameState } = args;
  return (
    // TODO: change classname to not give away mine locations
    <td className={"cell " + mine + " " + state + " " + gameState}>
      {state === "show" ? (mine ? "M" : number) : state}
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
              {row.map(([mine, number, state], col_ind) => {
                return (
                  <Cell
                    key={col_ind}
                    args={{ mine, number, state, gameState }}
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

export default Field;
