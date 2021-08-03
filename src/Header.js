import { useState } from "react";

const difficultyList = ["Easy", "Medium", "Hard", "Custom"];
const inputList = ["Rows", "Columns", "Mines"];

function updateDimensions(e, inputs, setInputs) {
  switch (e.target.value) {
    case "easy":
      setInputs({ difficulty: "easy", rows: 9, columns: 9, mines: 10 });
      break;
    case "medium":
      setInputs({ difficulty: "medium", rows: 16, columns: 16, mines: 40 });
      break;
    case "hard":
      setInputs({ difficulty: "hard", rows: 16, columns: 30, mines: 99 });
      break;
    default:
      setInputs({ ...inputs, difficulty: "custom" });
  }
}

function DifficultyRadio({ difficulty, inputs, setInputs }) {
  let lbl = difficulty.toLowerCase();
  return (
    <>
      <input
        type="radio"
        id={lbl}
        name="difficulty"
        value={lbl}
        checked={inputs.difficulty === lbl}
        // TODO: add useEffect to change params
        onChange={(e) => updateDimensions(e, inputs, setInputs)}
      />
      <label htmlFor={lbl}>{difficulty}</label>
    </>
  );
}

function Input({ input, inputs, setInputs }) {
  let lbl = input.toLowerCase();
  return (
    <label htmlFor={lbl}>
      Rows:
      <input
        type="text"
        id={lbl}
        name={lbl}
        value={inputs.[lbl]} // prettier doesn't like it
        // TODO: allow numbers only, prevent out-of-bounds numbers
        onChange={(e) => setInputs({ ...inputs, [lbl]: e.target.value })}
      />
    </label>
  );
}

function Header({ args }) {
  let { params, setParams } = args;

  const [inputs, setInputs] = useState(params);

  return (
    <>
      {difficultyList.map((difficulty) => {
        return (
          <DifficultyRadio
            key={difficulty}
            difficulty={difficulty}
            inputs={inputs}
            setInputs={setInputs}
          />
        );
      })}
      <br /> {/* TODO: improve css and remove this */}
      {inputList.map((input) => {
        return (
          <Input
            key={input}
            input={input}
            inputs={inputs}
            setInputs={setInputs}
          />
        );
      })}
      {inputs.difficulty}
      {inputs.mines}
    </>
  );
}

export default Header;
