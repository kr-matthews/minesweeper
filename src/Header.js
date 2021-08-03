const difficulties = ["Easy", "Medium", "Hard", "Custom"];
const parameters = ["Rows", "Columns", "Mines"];

function DifficultyRadio({ txt, diff, setDiff }) {
  let lbl = txt.toLowerCase();
  return (
    <>
      <input
        type="radio"
        id={lbl}
        name="diff"
        value={lbl}
        checked={diff === lbl}
        // TODO: add useEffect to change params
        onChange={(e) => setDiff(e.target.value)}
      />
      <label htmlFor={lbl}>{txt}</label>
    </>
  );
}

function ParamInput({ param, params, setParams }) {
  let lbl = param.toLowerCase();
  return (
    <label htmlFor={lbl}>
      Rows:
      <input
        type="text"
        id={lbl}
        name={lbl}
        value={params.[lbl]}
        // TODO: allow numbers only, prevent out-of-bounds numbers
        // TODO: add useEffect to change field
        onChange={(e) => setParams({ ...params, [lbl]: e.target.value })}
      />
    </label>
  );
}

function Header({ args }) {
  let { diff, setDiff, params, setParams } = args;
  return (
    <>
      {difficulties.map((txt) => {
        return (
          <DifficultyRadio key={txt} txt={txt} diff={diff} setDiff={setDiff} />
        );
      })}
      <br /> {/* TODO: improve css and remove this */}
      {parameters.map((param) => {
        return (
          <ParamInput
            key={param}
            param={param}
            params={params}
            setParams={setParams}
          />
        );
      })}
    </>
  );
}

export default Header;
