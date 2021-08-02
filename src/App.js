import { useState } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

import "./index.css";
import "./field.css";

function App() {
  // Constants

  const [diff, setDiff] = useState("easy");
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [mines, setMines] = useState(10);

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
      <Header
        args={{ diff, setDiff, rows, setRows, cols, setCols, mines, setMines }}
      />
      <Field args={{ field, setField }} />
      <Footer />
    </>
  );
}

export default App;
