import { useState } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import "./index.css";
import "./field.css";

function App() {
  // Constants

  const [params, setParams] = useState({
    difficulty: "easy",
    rows: 9,
    columns: 9,
    mines: 10,
  });

  const [gameState, setGameState] = useState("uninitialized");
  const [field, setField] = useState([
    // dummy data for testing
    [
      [false, 2, "show"],
      [false, 2, "hide"],
    ],
    [
      [true, 2, "hide"],
      [true, 2, "flag"],
    ],
  ]);

  return (
    <>
      <h1>Minesweeper</h1>
      <Header args={{ params, setParams }} />
      <Field args={{ field, setField, gameState, setGameState }} />
      {params.difficulty}
      {params.mines}
      <Footer />
    </>
  );
}

export default App;
