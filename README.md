# Minesweeper

This is a simple single-page application for one human player to play the classic game minesweeper.

## Play

On GitHub Pages at [https://kr-matthews.github.io/minesweeper/](https://kr-matthews.github.io/minesweeper/).

## Features

### Current

- Classic minesweeper game where you can select a standard field dimension and mine count, or input custom parameters.

- Validity of custom parameters is visually indicated in real-time, with explanations on hover.

- Includes flags, and you can click uncovered cells with the correct number of adjacent flags to auto-uncover all non-flagged neighbours.

- Mines are randomly distributed after the first (left) click, and the first-clicked cell will have no adjacent mines whenever possible (and if not possible, then it will have minimal possible adjacency count).

- There is a timer, and high-scores are tracked using local storage.

- On high-score resets, a confirmation is required to avoid accidental resets.

- Optional features: highlighting cells with too many adjacent flags, and cycling through a "?" in addition to a flag on right-clicks.

### Potential Future

- Change flags to being set on key-down.

- When clicking on a revealed square with insufficient adjacent flags, briefly indicate the adjacent non-flagged (and non-question-marked) cells.

## Intentions

After my first game ([tic-tac-toe](https://github.com/kr-matthews/tic-tac-toe)) where I mainly just wanted a functioning final product, here I was more focusing on adopting better practices and techniques, as well as nicer (but still very simple) styling via CSS. I also wanted to explore local storage or cookies for tracking (personal) high-scores.

## Focus

I focused on simplifying the experience (everything on a single screen which never changes, rather than an initial screen to select parameters), improving the input of parameters (immediate visual feedback of validity, buttons to increase/decrease by one), separation of different code into different files (though this was not so successful), and local storage (for personal high-scores).

Towards the end, as I was adding in the timer and high-scores (the final features), I finally understood why and how to use custom hooks. So that also became a focus for the last little bit.

## Flaws

- Some instances of `useState` should be replaced by `useReducer`.

- A side effect (via `useEffect`) is used to update the game status, but it could just be a stateless value, calculated directly from the other values.

- More generally, the decision for many values -- between stateless and stateful -- was not thought through properly.

- The game logic should be encapsulated into a custom hook (as the timer logic and high-score storage logic each are).

- The `useTimer` custom hook deals with time-stamps awkwardly.

- There is a lot of prop-drilling.

- There are hardly any tests, and the existing ones are only unit tests for helper functions -- components and hooks are not tested.

- There's no indication that the board has updated if you select the same size but a different mine count (one might worry it didn't update).

- Many people don't notice the rules at the bottom.

- On FireFox mobile, holding a flag or question mark will (apparently) still produce the context menu, for unknown reasons.

* You can install the "React Developer Tools" browser extension and inspect individual cells to see whether they have a mine.
