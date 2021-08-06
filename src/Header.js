import { useState } from "react";

import { extract } from "./objectAttributeAccessor.js";

// constants

const difficultyList = ["Easy", "Medium", "Hard"];
const inputList = ["Rows", "Columns", "Mines"];

// helper functions

function isNumber(str) {
  return str === "" || /^[0-9\b]+$/.test(str);
}

function isValidInput(input, inputs) {
  let { rows, columns, mines } = inputs;
  switch (input) {
    case "mines":
      return 0 <= mines && mines < rows * columns;
    case "rows":
      return 0 < rows && rows <= 24;
    case "columns":
      return 0 < columns && columns <= 30;
    default:
      return false;
  }
}

function presets(diff) {
  switch (diff) {
    case "Easy":
      return { rows: 9, cols: 9, mines: 10 };
    case "Medium":
      return { rows: 16, cols: 16, mines: 40 };
    case "Hard":
      return { rows: 16, cols: 30, mines: 99 };
    default:
      return { rows: 10, cols: 10, mines: 99 };
  }
}

function displayDifficulty(diff) {
  let { rows, cols, mines } = presets(diff);
  return diff + ": " + rows + "x" + cols + ", " + mines + " mines";
}

function tooltip(input) {
  // input boxes already enforce digits-only (ie non-negative integers)
  switch (input) {
    case "rows":
      return "Must be between 1 and 24 inclusive.";
    case "columns":
      return "Must be between 1 and 30 inclusive.";
    case "mines":
      return "Must be fewer mines than cells.";
    default:
  }
}

// click handlers

function updateDifficulty(e, inputs, setInputs) {
  setInputs({ ...inputs, difficulty: e.target.value });
}

function updateAnInput(e, inputs, setInputs, lbl) {
  let str = e.target.value;
  let num = +str;
  // only proceed if the value consists of digits (or is blank)
  if (isNumber(str)) {
    setInputs({ ...inputs, [lbl]: num });
  }
}

function adjustNumber(lbl, inputs, setInputs, change) {
  let num = extract(inputs, lbl); //inputs.[lbl] // prettier doesn't like it
  // only proceed if the number will remain positive
  if (change > 0 || num > 0) {
    setInputs({ ...inputs, [lbl]: num + change });
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
        onChange={(e) => updateDifficulty(e, inputs, setInputs)}
      />
      <label htmlFor={lbl}>{displayDifficulty(difficulty)}</label>
    </>
  );
}

function Input({ input, inputs, setInputs }) {
  let lbl = input.toLowerCase();
  return (
    <label htmlFor={lbl}>
      {input}:
      <button
        type="button"
        onClick={() => adjustNumber(lbl, inputs, setInputs, -1)}
      >
        -
      </button>
      <input
        type="text"
        id={lbl}
        name={lbl}
        value={extract(inputs, lbl)} //{inputs.[lbl]} // prettier doesn't like it
        onChange={(e) => updateAnInput(e, inputs, setInputs, lbl)}
      />
      <button
        type="button"
        onClick={() => adjustNumber(lbl, inputs, setInputs, 1)}
      >
        +
      </button>
      {isValidInput(lbl, inputs) ? (
        <span style={{ color: "green" }}>&#10003;</span>
      ) : (
        <span className="toolcontainer" style={{ color: "red" }}>
          &#10007;<span className="tooltip">{tooltip(lbl)}</span>
        </span>
      )}
    </label>
  );
}

// primary component

// TODO: display mine density
// TODO: display suggested mines for custom
// TODO: add handlers for both submit buttons

function Header({ args }) {
  let { params, setParams } = args;

  const [inputs, setInputs] = useState(params);

  return (
    <>
      <p>Select a standard difficulty, or specify custom parameters.</p>
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
      <button type="button">Start Standard Game</button>

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
      <button type="button">Start Custom Game</button>
    </>
  );
}

export default Header;
