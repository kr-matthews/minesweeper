import { useState } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import "./index.css";
import "./field.css";

function App() {
  // Constants

  const [params, setParams] = useState({
    rows: 9,
    columns: 9,
    mines: 10,
  });
  const [gameState, setGameState] = useState("reset");
  // each cell is hasMine (t/f), state (show/hide/flag), adjCount (#)
  const [field, setField] = useState([
    // dummy data for testing
    [
      { hasMine: false, state: "show", adjCount: 2 },
      { hasMine: false, state: "hide", adjCount: 2 },
    ],
    [
      { hasMine: true, state: "hide", adjCount: 2 },
      { hasMine: true, state: "flag", adjCount: 2 },
    ],
  ]);

  return (
    <>
      <h1>Minesweeper</h1>
      <Header args={{ params, setParams, setGameState }} />
      <Field args={{ field, setField, gameState, setGameState }} />
      <Footer />
    </>
  );
}

export default App;
