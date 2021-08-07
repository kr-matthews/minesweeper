import { useState } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import { skeletonField } from "./Field.js";

import "./index.css";
import "./field.css";

function App() {
  // Constants

  const [mineCount, setMineCount] = useState(10);
  const [gameState, setGameState] = useState("reset");
  // each cell is hasMine (t/f), state (show/hide/flag), adjCount (#)
  const [field, setField] = useState(skeletonField(9, 9));

  return (
    <>
      <h1>Minesweeper</h1>
      <Header args={{ setMineCount, setGameState, setField }} />
      <Field args={{ mineCount, gameState, setGameState, field, setField }} />
      <Footer />
    </>
  );
}

export default App;
