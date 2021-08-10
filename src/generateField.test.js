import { getNeighbours } from "./generateField.js";

it("getNeighbours", () => {
  expect(getNeighbours(1, 1, 3, 4).sort()).toEqual(
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [2, 1],
      [2, 0],
      [1, 0],
      [0, 0],
      [0, 1],
    ].sort()
  );
  expect(getNeighbours(1, 0, 3, 4).sort()).toEqual(
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
    ].sort()
  );
  expect(getNeighbours(2, 3, 3, 4).sort()).toEqual(
    [
      [2, 2],
      [1, 2],
      [1, 3],
    ].sort()
  );
});
