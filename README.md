# Minesweeper

### Play

[https://kr-matthews.github.io/minesweeper/](https://kr-matthews.github.io/minesweeper/)

### Features

Classic minesweeper game where you can select a standard field dimension and mine count, or input custom parameters.

Includes flags, and you can click uncovered cells with the correct number of adjacent flags to auto-uncover all non-flagged neighbours.

Mines are randomly distributed after the first (left) click, and the first-clicked cell will have no adjacent mines whenever possible (and if not possible, then it will have minimal possible adjacency count).

There is a timer, and high-scores are tracked using localStorage.

Optional features: highlighting cells with too many adjacent flags, and cycling through a "?" in addition to a flag on right-clicks.

### Flaws

useState is over-relied on; many instances should be replaced by useReducer.
Some logic should be wrapped into custom hooks (as the timer is).
There is way too much prop-drilling.
The timer pauses when the window isn't active.
You can install the "React Developer Tools" browser extension and inspect individual cells to see whether they have a mine.
