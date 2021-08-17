import { useState } from "react";

function RulesText() {
  return (
    <div>
      <h3>Rules</h3>
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
        If you click an aready-uncovered cell and it's number matches the number
        of adjacent flags, all other adjecent cells will be uncovered. This can
        save you some clicks, but isn't necessary.
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
        className="rules"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Rules" : "Show Rules"}
      </button>
      {isOpen && <RulesText />}
    </>
  );
}

export default Rules;
