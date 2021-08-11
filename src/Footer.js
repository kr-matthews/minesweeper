// TODO: add links to related: https://pwmarcz.pl/kaboom/ and https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html
// TODO: timer, if not too difficulty
// TODO: high-scores, if local storage is easy
// TODO: style footer

import Rules from "./Rules.js";

function Footer({ args }) {
  let { gameState } = args;
  return (
    <>
      <p>The game is {gameState}.</p>
      <Rules />
    </>
  );
}

export default Footer;
