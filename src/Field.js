function Square({ args }) {
  let { mine, number, state } = args;
  return (
    <td className="square">
      {state === "show" ? (mine ? "M" : number) : state}
    </td>
  );
}

function Field({ args }) {
  let { field } = args;
  return (
    <table className="field">
      <tbody>
        {field.map((row, row_ind) => {
          return (
            <tr key={row_ind}>
              {row.map(([mine, number, state], col_ind) => {
                return <Square key={col_ind} args={{ mine, number, state }} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Field;

/// borders not working
