// TODO: show xy.zw time on stop, say whether it's a new high-score in message
// TODO: restyle footer to line up displays and allow .zw smoothly

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
  let { time, highScore, gameState, flagCount } = args;
  let currentSeconds = Math.floor(time / 1000);
  let highScoreSeconds =
    highScore === Number.POSITIVE_INFINITY
      ? "N/A"
      : Math.floor(highScore / 1000);
  return (
    <>
      <p>
        Flags: <span className="fixed-width-span">{flagCount}</span>
      </p>
      <p>
        Time: <span className="fixed-width-span">{currentSeconds}</span>
      </p>
      <p>
        High-Score: <span className="fixed-width-span">{highScoreSeconds}</span>
      </p>
      <p>{message(gameState)}</p>
      <Rules />
    </>
  );
}

export default Footer;
