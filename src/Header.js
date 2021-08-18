import { useState } from "react";

import { extract } from "./objectAttributeAccessor.js";
import { resetField } from "./Field.js";

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
      return { rows: 9, columns: 9, mines: 10 };
    case "medium":
      return { rows: 16, columns: 16, mines: 40 };
    case "hard":
      return { rows: 16, columns: 30, mines: 99 };
    default:
      // shouldn't happen
      return { rows: 10, columns: 10, mines: 99 };
  }
}

function displayDifficulty(difficulty) {
  let diff = difficulty.toLowerCase();
  let { rows, columns, mines } = presets(diff);
  return rows + "x" + columns + ", " + mines + " mines";
}

function displayMineDensity(inputs) {
  return (
    <div className="density">
      Mine density:{" "}
      {inputs.rows > 0 && inputs.columns > 0
        ? Math.round((100 * inputs.mines) / (inputs.rows * inputs.columns)) +
          "%"
        : "N/A"}
    </div>
  );
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

function startCustom(
  inputs,
  setMineCount,
  setRevealCount,
  setFlagCount,
  setGameState,
  setField
) {
  let isValid = inputList.every((input) =>
    isValidInput(input.toLowerCase(), inputs)
  );
  if (isValid) {
    // discard difficulty from inputs
    resetField(
      inputs,
      setMineCount,
      setRevealCount,
      setFlagCount,
      setGameState,
      setField
    );
  } else {
    alert('Invalid parameters. However over red "x"s for details.');
  }
}

function startStandard(
  diff,
  setMineCount,
  setRevealCount,
  setFlagCount,
  setGameState,
  setField
) {
  // based on radio button selection so always valid
  let inputs = presets(diff);
  resetField(
    inputs,
    setMineCount,
    setRevealCount,
    setFlagCount,
    setGameState,
    setField
  );
}

// function components

function DifficultyRadio({ difficulty, inputs, setInputs }) {
  let diff = difficulty.toLowerCase();
  return (
    <div className="radio">
      <input
        type="radio"
        id={diff}
        name="difficulty"
        value={diff}
        checked={inputs.difficulty === diff}
        onChange={(e) => updateDifficulty(e, inputs, setInputs)}
      />
      <label htmlFor={diff}>
        <div className="diff">{difficulty + ":"}</div>
        <div className="desc">{displayDifficulty(difficulty)}</div>
      </label>
    </div>
  );
}

function Input({ input, inputs, setInputs }) {
  let inp = input.toLowerCase();
  return (
    <>
      <div className="input">
        <label htmlFor={inp}>{input}:</label>
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
      </div>
    </>
  );
}

// primary component

function Header({ args }) {
  let {
    setMineCount,
    setRevealCount,
    setFlagCount,
    setGameState,
    setField,
  } = args;

  const [inputs, setInputs] = useState({
    rows: 9,
    columns: 9,
    mines: 10,
    difficulty: "easy",
  });

  return (
    <>
      {/* standard game options */}
      <div className="options">
        <div className="option">
          <h4>Standard Game</h4>
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
          {displayMineDensity(presets(inputs.difficulty))}
          <button
            type="button"
            className="start"
            onClick={() =>
              startStandard(
                inputs.difficulty,
                setMineCount,
                setRevealCount,
                setFlagCount,
                setGameState,
                setField
              )
            }
          >
            Start Standard Game
          </button>
        </div>

        {/* custom game inputs */}
        <div className="option">
          <h4>Custom Game</h4>
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
          {displayMineDensity(inputs)}
          <button
            type="button"
            className="start"
            onClick={() =>
              startCustom(
                inputs,
                setMineCount,
                setRevealCount,
                setFlagCount,
                setGameState,
                setField
              )
            }
          >
            Start Custom Game
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

// for testing

export { isNumber, isValidInput };
