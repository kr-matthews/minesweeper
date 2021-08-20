import { useState } from "react";

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

  // TODO: resetHighScore (just one, or all)

  return { getHighScore, updateHighScore };
}

export default useHighScores;
