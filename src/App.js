import { useState, useEffect } from "react";

import useTimer from "./Timer.js";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import { skeletonField } from "./generateField.js";

import "./index.css";
import "./header.css";
import "./field.css";
import "./cell.css";
import "./footer.css";

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
  let { time, handleStart, handleStop, handleReset } = useTimer();

  // effects

  // check whether game is won
  useEffect(() => {
    if (revealCount + mineCount === field.length * field[0].length) {
      setGameState("won");
      handleStop();
    }
  }, [revealCount, mineCount, field, handleStop]);

  // return

  return (
    <>
      <h1>Minesweeper</h1>
      <Header
        args={{
          setMineCount,
          setRevealCount,
          setFlagCount,
          setGameState,
          setField,
          handleReset,
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
        }}
      />
      <Footer args={{ time, gameState, flagCount }} />
    </>
  );
}

export default App;
