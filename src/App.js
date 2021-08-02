import { useState } from "react";

import Header from "./Header.js";
import Field from "./Field.js";
import Footer from "./Footer";

function App() {
  // Constants

  const [diff, setDiff] = useState("easy");
  const [rows, setRows] = useState(9);
  const [cols, setCols] = useState(9);
  const [mines, setMines] = useState(10);

  const [field, setField] = useState();

  return (
    <>
      <h1>Minesweeper</h1>
      <Header diff setDiff rows setRows cols setCols mines setMines />
      <Field field setField />
      <Footer />
    </>
  );
}

export default App;
