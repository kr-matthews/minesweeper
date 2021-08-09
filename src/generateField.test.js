import { updateIndices, insertNonMine } from "./generateField.js";

it("updateIndices", () => {
  expect(updateIndices(0, 0, 10)).toEqual([0, 1]);
  expect(updateIndices(0, 8, 10)).toEqual([0, 9]);
  expect(updateIndices(0, 9, 10)).toEqual([1, 0]);
  expect(updateIndices(3, 0, 2)).toEqual([3, 1]);
  expect(updateIndices(3, 1, 2)).toEqual([4, 0]);
});

it("insert false into array", () => {
  expect(insertNonMine([true, true, false], 0)).toEqual([
    false,
    true,
    true,
    false,
  ]);
  expect(insertNonMine([true, true, false], 1)).toEqual([
    true,
    false,
    true,
    false,
  ]);
  expect(insertNonMine([true, true, false], 2)).toEqual([
    true,
    true,
    false,
    false,
  ]);
  expect(insertNonMine([true, true, false], 2)).toEqual([
    true,
    true,
    false,
    false,
  ]);
});
