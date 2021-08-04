import { useState } from "react";

const difficultyList = ["Easy", "Medium", "Hard", "Custom"];
const inputList = ["Rows", "Columns", "Mines"];

// helper functions

function isNumber(str) {
  return str === "" || /^[0-9\b]+$/.test(str);
}

// click handlers

function updateInputs(e, inputs, setInputs) {
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

// TODO: figure out best way for data validation and updating
//   likely need to allow any (0-9)* in row & col, but show check or cross
//   don't want to auto lower mines because they may be backspacing row temp
function updateAnInput(e, inputs, setInputs, lbl) {
  let str = e.target.value;
  let num = +str;
  // only proceed if the value is a number, within bounds
  if (isNumber(str) && lbl === "mines" && num < inputs.rows * inputs.columns) {
    // not only update lbl, but change difficulty is now custom
    setInputs({ ...inputs, [lbl]: str, difficulty: "custom" });
  } else if (isNumber(str) && num <= 30) {
    setInputs({
      ...inputs,
      [lbl]: str,
      difficulty: "custom",
      mines: Math.min(inputs.mines, inputs.rows * inputs.columns - 1),
    });
  }
}

// function components

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
        onChange={(e) => updateInputs(e, inputs, setInputs)}
      />
      <label htmlFor={lbl}>{difficulty}</label>
    </>
  );
}

function Input({ input, inputs, setInputs }) {
  let lbl = input.toLowerCase();
  return (
    <label htmlFor={lbl}>
      {input}:
      <input
        type="text"
        id={lbl}
        name={lbl}
        value={inputs.[lbl]} // prettier doesn't like it
        // TODO: allow numbers only, prevent out-of-bounds numbers
        onChange={(e) => updateAnInput(e, inputs, setInputs, lbl)}
      />
    </label>
  );
}

// primary component

// TODO: add submit button (and handler)
// TODO: add -/+ buttons around each input box
// TODO: display mine density
// TODO: display suggested mines for custom

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
      {inputs.rows + " " + inputs.columns + " " + inputs.mines}
      {inputs.difficulty}
    </>
  );
}

export default Header;
