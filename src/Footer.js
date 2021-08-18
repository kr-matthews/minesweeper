// TODO: add links to related: https://pwmarcz.pl/kaboom/ and https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html
// TODO: high-scores, if local storage is easy

import Rules from "./Rules.js";

function message(gameState) {
  // TODO: show xy.zw time, say whether it's a new high-score
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
  let { time, gameState, flagCount } = args;
  let seconds = Math.floor(time / 1000);
  return (
    <>
      <p>
        Flags: <span className="fixed-width-span">{flagCount}</span>
      </p>
      <p>
        Time: <span className="fixed-width-span">{seconds}</span>
      </p>
      <p>{message(gameState)}</p>
      <Rules />
    </>
  );
}

export default Footer;
