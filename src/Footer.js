// TODO: add links to related: https://pwmarcz.pl/kaboom/ and https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html
// TODO: timer, if not too difficulty
// TODO: high-scores, if local storage is easy
// TODO: style footer

import Rules from "./Rules.js";

function message(gameState) {
  switch (gameState) {
    case "reset":
      return "The field is reset. Click anywhere to begin.";
    case "ongoing":
      return "The game is in progress.";
    case "won":
      return "Congratulations, you won!";
    case "lost":
      return "Uh oh, you uncovered a mine. You lost.";
    default:
      return "You found an error!";
  }
}

function Footer({ args }) {
  let { gameState, flagCount } = args;
  return (
    <>
      <p>
        Flags: <span className="fixed-width-span">{flagCount}</span>
      </p>
      <p>{message(gameState)}</p>
      <Rules />
    </>
  );
}

export default Footer;
