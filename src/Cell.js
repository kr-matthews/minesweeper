import {
  generateMines,
  cascadeReveal,
  hasFullFlags,
  revealNonFlagNeighbours,
} from "./Field.js";

import flagImage from "./images/flag.svg";
import hiddenMineImage from "./images/mine.svg";
import flaggedMineImage from "./images/flagged-mine.svg";
import clickedMineImage from "./images/clicked-mine.svg";

const flag = <img src={flagImage} alt="F" />;
const hiddenMine = <img src={hiddenMineImage} alt="M" />;
const flaggedMine = <img src={flaggedMineImage} alt="FM" />;
const clickedMine = <img src={clickedMineImage} alt="!!!" />;

function cellDisplay(hasMine, state, adjCount, gameState) {
  if (gameState === "reset" || gameState === "ongoing") {
    switch (state) {
      case "hide":
        return "";
      case "show":
        return adjCount;
      case "flag":
        return flag;
      default:
        return "Error!";
    }
  } else if (gameState === "won") {
    if (!hasMine) {
      return adjCount;
    } else if (state === "hide") {
      return hiddenMine;
    } else {
      //state === "flag"
      return flaggedMine;
    }
  } else if (gameState === "lost") {
    if (hasMine) {
      switch (state) {
        case "hide":
          return hiddenMine;
        case "show":
          return clickedMine;
        case "flag":
          return flaggedMine;
        default:
          return "Error!";
      }
    } else {
      switch (state) {
        case "hide":
          return "";
        case "show":
          return adjCount;
        case "flag":
          return flag;
        default:
          return "Error!";
      }
    }
  }
}

function cellClass(hasMine, state, adjCount, gameState) {
  if (state === "show") {
    // nothing is clickable once game is over
    return "cell";
  }
  return "cell hidden";
}

function buttonClass(hasMine, state, adjCount, gameState) {
  if (gameState === "won" || gameState === "lost") {
    // nothing is clickable once game is over
    return "_" + adjCount.toString();
  }
  if (state === "hide") {
    return "clickable";
  }
  return "_" + adjCount.toString();
}

function handleLeftClick(
  r,
  c,
  mineCount,
  setRevealCount,
  gameState,
  setGameState,
  field,
  setField,
  handleStart,
  handleStop
) {
  // don't do anything if the game is over
  if (gameState === "won" || gameState === "lost") {
    return;
  }
  let cell = field[r][c];
  // generate the mines if this is the first click
  if (gameState === "reset" && cell.state === "hide") {
    setGameState("ongoing");
    generateMines(r, c, mineCount, field, setField);
    handleStart();
  }
  // now gameState is ongoing
  // now reveal the cell and perform other actions as necessary
  if (cell.state === "hide" && cell.hasMine) {
    // just lost: reveal current cell...
    let newField = [...field];
    newField[r][c].state = "show";
    setField(newField);
    // ... and  trigger loss
    setGameState("lost");
    handleStop();
  } else if (cell.state === "hide") {
    // no mine: reveal cell, and iterate on any neighbours with 0 adj mines
    cascadeReveal(
      [[r, c]],
      setRevealCount,
      setGameState,
      field,
      setField,
      handleStop
    );
    // there is a useEffect to check when the game is won
  } else if (cell.state === "show" && hasFullFlags(r, c, field)) {
    revealNonFlagNeighbours(
      r,
      c,
      setRevealCount,
      setGameState,
      field,
      setField,
      handleStop
    );
  }
}

function handleRightClick(e, r, c, gameState, setFlagCount, field, setField) {
  e.preventDefault();
  // don't do anything if the game is over
  if (gameState === "won" || gameState === "lost") {
    return;
  }
  let cell = field[r][c];
  if (cell.state === "hide") {
    setField((prev) => {
      let newField = [...prev];
      newField[r][c].state = "flag";
      return newField;
    });
    setFlagCount((prev) => prev + 1);
  } else if (cell.state === "flag") {
    setField((prev) => {
      let newField = [...prev];
      newField[r][c].state = "hide";
      return newField;
    });
    setFlagCount((prev) => prev - 1);
  }
}

// always return a button, style it differently based on classname
// won't act like a button sometimes
function Cell({ args }) {
  let {
    rowInd,
    colInd,
    hasMine,
    setRevealCount,
    setFlagCount,
    state,
    adjCount,
    mineCount,
    gameState,
    setGameState,
    field,
    setField,
    handleStart,
    handleStop,
  } = args;
  return (
    <td className={cellClass(hasMine, state, adjCount, gameState)}>
      <button
        type="button"
        className={buttonClass(hasMine, state, adjCount, gameState)}
        onClick={() =>
          handleLeftClick(
            rowInd,
            colInd,
            mineCount,
            setRevealCount,
            gameState,
            setGameState,
            field,
            setField,
            handleStart,
            handleStop
          )
        }
        onContextMenu={(e) =>
          handleRightClick(
            e,
            rowInd,
            colInd,
            gameState,
            setFlagCount,
            field,
            setField
          )
        }
      >
        {cellDisplay(hasMine, state, adjCount, gameState)}
      </button>
    </td>
  );
}

export default Cell;
