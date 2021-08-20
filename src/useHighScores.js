import { useState } from "react";

// should this use useReducer instead of useState?

function useHighScores() {
  const [highScores, setHighScores] = useState(
    JSON.parse(localStorage.getItem("HS")) || {}
  );

  function makeName(rows, cols, mines) {
    return rows + "-" + cols + "-" + mines;
  }

  function getHighScore(rows, cols, mines) {
    let name = makeName(rows, cols, mines);
    let score = highScores[name];
    return score === undefined ? Number.POSITIVE_INFINITY : score;
  }

  function updateHighScore(rows, cols, mines, score) {
    let name = makeName(rows, cols, mines);
    let oldHighScore = getHighScore(rows, cols, mines);
    let newHighScore = Math.min(oldHighScore, score);
    let newHighScores = { ...highScores, [name]: newHighScore };
    setHighScores(newHighScores);
    localStorage.setItem("HS", JSON.stringify(newHighScores));
  }

  // TODO: add confirmtion box to avoid accidental clicks

  function resetHighScores() {
    setHighScores({});
    localStorage.setItem("HS", JSON.stringify({}));
  }

  function resetHighScore(rows, cols, mines) {
    let name = makeName(rows, cols, mines);
    let newHighScores = { ...highScores };
    delete newHighScores[name];
    setHighScores(newHighScores);
    localStorage.setItem("HS", JSON.stringify(newHighScores));
  }

  return { getHighScore, updateHighScore, resetHighScore, resetHighScores };
}

export default useHighScores;
