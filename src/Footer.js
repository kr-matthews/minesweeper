import { useState } from "react";

import ConfirmAndAct from "./ConfirmAndAct.js";
import Rules from "./Rules.js";
import Links from "./links/Links.js";

function message(gameState, isHighScore) {
  switch (gameState) {
    case "reset":
      return "The field is reset. Click anywhere to begin.";
    case "ongoing":
      return "The game is in progress.";
    case "won":
      return isHighScore
        ? "Congratulations, you set a high score!"
        : "Congratulations, you won!";
    case "lost":
      return "Uh oh, you uncovered a mine. You lost.";
    default:
      return "You found an error!";
  }
}

// return strings, decimal to two digits
function convertTime(milliseconds) {
  if (milliseconds === Number.POSITIVE_INFINITY) {
    return ["N/A", ""];
  }
  let seconds = Math.floor(milliseconds / 1000);
  let secondsString = seconds.toString();
  let decimal = Math.floor((milliseconds % 1000) / 10);
  let decimalString = decimal < 10 ? "0" + decimal : decimal.toString();
  return [secondsString, decimalString];
}

function Footer({ args }) {
  let {
    m,
    n,
    time,
    highScore,
    gameState,
    mineCount,
    flagCount,
    resetHighScore,
    resetHighScores,
  } = args;
  let [reset, setReset] = useState("");
  let [currentSeconds, currentDecimal] = convertTime(time);
  let [highScoreSeconds, highScoreDecimal] = convertTime(highScore);
  let isHighScore = time === highScore;
  return (
    <>
      <p className="stat">
        <span className="name">Flags: </span>
        <span className="value">{flagCount}</span>
        <span className="decimal"></span>
      </p>
      <p className="stat">
        <span className="name">Time: </span>
        <span className="value">{currentSeconds}</span>
        <span className="decimal">
          {gameState === "won" || gameState === "lost"
            ? "." + currentDecimal
            : ""}
        </span>
      </p>
      <p className="stat">
        <span className="name">High Score: </span>
        <span className="value">{highScoreSeconds}</span>
        <span className="decimal">
          {highScoreDecimal && "." + highScoreDecimal}
        </span>
      </p>
      <p>{message(gameState, isHighScore)}</p>
      {reset === "" && (
        <div className="resets">
          <button type="button" onClick={() => setReset("one")}>
            Reset this high score
          </button>
          <button type="button" onClick={() => setReset("all")}>
            Reset all high scores
          </button>
        </div>
      )}
      {reset === "one" && (
        <ConfirmAndAct
          txt="reset one"
          action={() => resetHighScore(m, n, mineCount)}
          setReset={setReset}
        />
      )}
      {reset === "all" && (
        <ConfirmAndAct
          txt="reset all"
          action={resetHighScores}
          setReset={setReset}
        />
      )}
      <Rules />
      <Links gitHubLink="https://github.com/kr-matthews/minesweeper" />
    </>
  );
}

export default Footer;
