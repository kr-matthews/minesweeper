import { useState, useEffect } from "react";
import {
  WithHeavyFooter,
  Body,
  HeavyFooter,
  HomeLink,
  CodeLink,
} from "footer-dependency/dist/lib";

import useTimer from "./useTimer.js";
import useHighScores from "./useHighScores.js";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import { skeletonField } from "./generateField.js";

import "./css/index.css";
import "./css/header.css";
import "./css/field.css";
import "./css/cell.css";
import "./css/footer.css";

function App() {
  // Constants

  // how many mines the field has
  const [mineCount, setMineCount] = useState(10);
  // how many non-mine cells have been revealed
  const [revealCount, setRevealCount] = useState(0);
  // how many flags are currently placed
  const [flagCount, setFlagCount] = useState(0);
  // reset, ongoing, won, lost
  const [gameState, setGameState] = useState("reset");
  // each cell is hasMine (t/f), state (show/hide/flag), adjCount (#)
  const [field, setField] = useState(skeletonField(9, 9));
  // time how long it takes to solve
  const { time, handleStart, handleStop, handleReset } = useTimer();
  // storage for high-scores
  const { getHighScore, updateHighScore, resetHighScore, resetHighScores } =
    useHighScores();
  // high-score for current field
  const highScore = getHighScore(field.length, field[0].length, mineCount);
  // using "?"s in addition to flags
  const [usingQs, setUsingQs] = useState(false);
  // highlight cells with too many adj flags?
  const [usingWarnings, setUsingWarnings] = useState(false);

  // effects

  // check whether game is won
  useEffect(() => {
    if (
      gameState === "ongoing" &&
      revealCount + mineCount === field.length * field[0].length
    ) {
      handleStop(time);
      setGameState("won");
      updateHighScore(field.length, field[0].length, mineCount, time);
    }
  }, [
    revealCount,
    mineCount,
    field,
    handleStop,
    gameState,
    updateHighScore,
    time,
  ]);

  // return

  return (
    <WithHeavyFooter>
      <Body>
        <h1>Minesweeper</h1>
        <Header
          args={{
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
          }}
        />
        <Field
          args={{
            mineCount,
            gameState,
            setGameState,
            field,
            setField,
            setRevealCount,
            setFlagCount,
            handleStart,
            handleStop,
            usingQs,
            usingWarnings,
          }}
        />
        <Footer
          args={{
            m: field.length,
            n: field[0].length,
            time,
            highScore,
            gameState,
            mineCount,
            flagCount,
            resetHighScore,
            resetHighScores,
          }}
        />
      </Body>
      <HeavyFooter>
        <HomeLink />
        <CodeLink gitHubRepoName="minesweeper" />
      </HeavyFooter>
    </WithHeavyFooter>
  );
}

export default App;
