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
