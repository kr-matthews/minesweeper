// TODO: add help pop-up

import { useState } from "react";

import { extract } from "./objectAttributeAccessor.js";

// constants

const difficultyList = ["Easy", "Medium", "Hard"];
const inputList = ["Rows", "Columns", "Mines"];

// helper functions

function isNumber(str) {
  return str === "" || /^[0-9\b]+$/.test(str);
}

function isValidInput(inp, inputs) {
  let { rows, columns, mines } = inputs;
  switch (inp) {
    case "mines":
      return 0 <= mines && mines < rows * columns;
    case "rows":
      return 0 < rows && rows <= 24;
    case "columns":
      return 0 < columns && columns <= 30;
    default:
      // shouldn't happen
      return false;
  }
}

function presets(diff) {
  switch (diff) {
    case "easy":
      return { rows: 9, cols: 9, mines: 10 };
    case "medium":
      return { rows: 16, cols: 16, mines: 40 };
    case "hard":
      return { rows: 16, cols: 30, mines: 99 };
    default:
      // shouldn't happen
      return { rows: 10, cols: 10, mines: 99 };
  }
}

function displayDifficulty(difficulty) {
  let diff = difficulty.toLowerCase();
  let { rows, cols, mines } = presets(diff);
  return diff + ": " + rows + "x" + cols + ", " + mines + " mines";
}

function tooltip(inp) {
  // input boxes already enforce digits-only (ie non-negative integers)
  switch (inp) {
    case "rows":
      return "Must be between 1 and 24 inclusive.";
    case "columns":
      return "Must be between 1 and 30 inclusive.";
    case "mines":
      return "Must be fewer mines than cells.";
    default:
      // shouldn't happen
      return "An unknown error has occured.";
  }
}

// click handlers

function updateDifficulty(e, inputs, setInputs) {
  setInputs({ ...inputs, difficulty: e.target.value });
}

function updateAnInput(e, inputs, setInputs, inp) {
  let str = e.target.value;
  let num = +str;
  // only proceed if the value consists of digits (or is blank)
  if (isNumber(str)) {
    setInputs({ ...inputs, [inp]: num });
  }
}

function adjustNumber(inp, inputs, setInputs, change) {
  let num = extract(inputs, inp); //inputs.[inp] // prettier doesn't like it
  // only proceed if the number will remain positive
  if (change > 0 || num > 0) {
    setInputs({ ...inputs, [inp]: num + change });
  }
}

function startCustom(inputs, setParams, setGameState) {
  let isValid = inputList.every((input) =>
    isValidInput(input.toLowerCase(), inputs)
  );
  if (isValid) {
    setGameState("uninitialized");
    // discard difficulty from inputs
    let { rows, columns, mines } = inputs;
    let params = { rows, columns, mines };
    setParams(params);
  } else {
    alert('Invalid parameters. However over red "x"s for details.');
  }
}

function startStandard(diff, setParams, setGameState) {
  // based on radio button selection so always valid
  setGameState("uninitialized");
  setParams(presets(diff));
}

// function components

function DifficultyRadio({ difficulty, inputs, setInputs }) {
  let diff = difficulty.toLowerCase();
  return (
    <>
      <input
        type="radio"
        id={diff}
        name="difficulty"
        value={diff}
        checked={inputs.difficulty === diff}
        onChange={(e) => updateDifficulty(e, inputs, setInputs)}
      />
      <label htmlFor={diff}>{displayDifficulty(difficulty)}</label>
    </>
  );
}

function Input({ input, inputs, setInputs }) {
  let inp = input.toLowerCase();
  return (
    <label htmlFor={inp}>
      {input}:
      <button
        type="button"
        onClick={() => adjustNumber(inp, inputs, setInputs, -1)}
      >
        -
      </button>
      <input
        type="text"
        id={inp}
        name={inp}
        value={extract(inputs, inp)} //{inputs.[inp]} // prettier doesn't like it
        onChange={(e) => updateAnInput(e, inputs, setInputs, inp)}
      />
      <button
        type="button"
        onClick={() => adjustNumber(inp, inputs, setInputs, 1)}
      >
        +
      </button>
      {isValidInput(inp, inputs) ? (
        <span style={{ color: "green" }}>&#10003;</span>
      ) : (
        <span className="toolcontainer" style={{ color: "red" }}>
          &#10007;<span className="tooltip">{tooltip(inp)}</span>
        </span>
      )}
      {input === "Mines" && (
        <div>
          Mine density:{" "}
          {Math.round((100 * inputs.mines) / (inputs.rows * inputs.columns))}%
        </div>
      )}
    </label>
  );
}

// primary component

function Header({ args }) {
  let { params, setParams, setGameState } = args;

  const [inputs, setInputs] = useState({ ...params, difficulty: "easy" });

  return (
    <>
      <div>Select a standard difficulty, or specify custom parameters.</div>
      <div>
        For a custom game, a mine density between 12% and 20% is recommended.
      </div>
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
      <button
        type="button"
        onClick={() =>
          startStandard(inputs.difficulty, setParams, setGameState)
        }
      >
        Start Standard Game
      </button>

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
      <button
        type="button"
        onClick={() => startCustom(inputs, setParams, setGameState)}
      >
        Start Custom Game
      </button>
    </>
  );
}

export default Header;

// for testing

export { isNumber, isValidInput };
