// import { useState } from "react";

import { extract } from "./objectAttributeAccessor.js";

function useHighScores() {
  function makeName(rows, cols, mines) {
    return rows + "-" + cols + "-" + mines;
  }

  function getHighScores() {
    return JSON.parse(localStorage.getItem("HS")) || {};
  }

  function getHighScore(rows, cols, mines) {
    let highScores = getHighScores();
    let name = makeName(rows, cols, mines);
    return extract(highScores, name) || Number.POSITIVE_INFINITY;
  }

  function updateHighScore(rows, cols, mines, score) {
    let name = makeName(rows, cols, mines);
    let oldHighScores = getHighScores();
    let oldHighScore = getHighScore(rows, cols, mines);
    let newHighScore = Math.min(oldHighScore, score);
    let newHighScores = { ...oldHighScores, [name]: newHighScore };
    localStorage.setItem("HS", JSON.stringify(newHighScores));
  }

  return { getHighScore, updateHighScore };
}

export default useHighScores;
