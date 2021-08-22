import { useState } from "react";

import { resetField } from "./Field.js";

import flag from "./images/flag.svg";
import questionMark from "./images/question-mark.svg";

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
  let num = inputs[inp];
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
  setField,
  handleReset
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
      setField,
      handleReset
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
  setField,
  handleReset
) {
  // based on radio button selection so always valid
  let inputs = presets(diff);
  resetField(
    inputs,
    setMineCount,
    setRevealCount,
    setFlagCount,
    setGameState,
    setField,
    handleReset
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
          value={inputs[inp]}
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
    handleReset,
    usingQs,
    setUsingQs,
    usingWarnings,
    setUsingWarnings,
  } = args;

  const [inputs, setInputs] = useState({
    rows: 9,
    columns: 9,
    mines: 10,
    difficulty: "easy",
  });

  return (
    <>
      {/* options */}
      <h4>Options</h4>
      <div className="option">
        <input
          type="checkbox"
          id="usingQs"
          name="usingQs"
          value={true}
          checked={usingQs}
          onChange={() => setUsingQs((prev) => !prev)}
        />
        {/* // TODO: insert image of ? */}
        <label htmlFor="usingQs">
          Use <img className="sml-img" src={questionMark} alt="'?'" /> in
          addition to <img className="sml-img" src={flag} alt="flag" /> on
          right-clicks
        </label>
      </div>
      <div className="option">
        <input
          type="checkbox"
          id="usingWarnings"
          name="usingWarnings"
          value={true}
          checked={usingWarnings}
          onChange={() => setUsingWarnings((prev) => !prev)}
        />
        <label htmlFor="usingWarnings">
          Highlight surpluses of adjacent flags
        </label>
      </div>

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
                setField,
                handleReset
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
                setField,
                handleReset
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
