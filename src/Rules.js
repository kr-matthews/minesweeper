import { useState } from "react";

function RulesText() {
  return (
    <div className="rules">
      <h4>Rules</h4>
      <p>
        All cells start covered. Certain cells have mines hidden underneath
        them. The goal is to uncover all the cells without mines. If you uncover
        a mine, you lose.
      </p>
      <p>
        When you uncover a non-mine cell, it will show you how many of the (up
        to 8) adjacent cells contain mines -- or, if there are no adjacent
        mines, it will automatically uncover all adjacent cells for you.
      </p>
      <p>
        You can mark cells that you think contain mines with a flag by
        right-clicking on them. Clicking a flagged cell will do nothing -- so
        you can't accidentally click it later. To unflag a cell, simply
        right-click it again.
      </p>
      <p>
        If you click an already-uncovered cell and its number matches the number
        of adjacent flags, all other adjacent cells will be uncovered. This can
        save you some clicks, but isn't necessary.
      </p>
      <p>
        For a custom game, a mine density between 12% and 20% is recommended.
      </p>
      <p>
        If you like minesweeper, consider{" "}
        <a
          href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/mines.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          this superior implementation
        </a>{" "}
        which guarantees you will never need to guess, and{" "}
        <a
          href="https://pwmarcz.pl/kaboom/"
          target="_blank"
          rel="noopener noreferrer"
        >
          this neat variation
        </a>{" "}
        which always penalizes a guess, unless guessing is necessary in which
        case any guess will be fine.
      </p>
    </div>
  );
}

function Rules() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="rules-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Rules" : "Show Rules"}
      </button>
      {isOpen && <RulesText />}
    </>
  );
}

export default Rules;
