import { useState, useEffect } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import { skeletonField } from "./generateField.js";

import "./index.css";
import "./field.css";
import "./cell.css";

function App() {
  // Constants

  const [mineCount, setMineCount] = useState(10);
  // how many non-mine cells have been revealed
  const [revealCount, setRevealCount] = useState(0);
  // reset, ongoing, won, lost
  const [gameState, setGameState] = useState("reset");
  // each cell is hasMine (t/f), state (show/hide/flag), adjCount (#)
  const [field, setField] = useState(skeletonField(9, 9));

  // effects

  // check whether game is won
  useEffect(() => {
    if (revealCount + mineCount === field.length * field[0].length) {
      setGameState("won");
    }
  }, [revealCount, mineCount, field]);

  // return

  return (
    <>
      <h1>Minesweeper</h1>
      <Header args={{ setMineCount, setRevealCount, setGameState, setField }} />
      <Field
        args={{
          mineCount,
          gameState,
          setGameState,
          field,
          setField,
          setRevealCount,
        }}
      />
      <Footer args={{ gameState }} />
    </>
  );
}

export default App;
