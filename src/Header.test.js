import { isNumber, isValidInput } from "./Header.js";

it("isNumber true", () => {
  expect(isNumber("")).toEqual(true);
  expect(isNumber("0")).toEqual(true);
  expect(isNumber("9")).toEqual(true);
  expect(isNumber("00")).toEqual(true);
  expect(isNumber("05")).toEqual(true);
  expect(isNumber("50")).toEqual(true);
  expect(isNumber("010")).toEqual(true);
  expect(isNumber("019283746501223456")).toEqual(true);
});

it("isNumber false", () => {
  expect(isNumber("a")).toEqual(false);
  expect(isNumber("@")).toEqual(false);
  expect(isNumber("A")).toEqual(false);
  expect(isNumber(".")).toEqual(false);
  expect(isNumber("-")).toEqual(false);
  expect(isNumber("3.")).toEqual(false);
  expect(isNumber("0.")).toEqual(false);
  expect(isNumber(".3")).toEqual(false);
  expect(isNumber(".0")).toEqual(false);
  expect(isNumber("0.0")).toEqual(false);
  expect(isNumber("6.3")).toEqual(false);
  expect(isNumber("-9")).toEqual(false);
  expect(isNumber("-4.8")).toEqual(false);
  expect(isNumber("45p904")).toEqual(false);
  expect(isNumber("two")).toEqual(false);
});

it("isValidInput all valid", () => {
  expect(isValidInput("rows", { rows: 9, columns: 9, mines: 10 })).toEqual(
    true
  );
  expect(isValidInput("columns", { rows: 9, columns: 9, mines: 10 })).toEqual(
    true
  );
  expect(isValidInput("mines", { rows: 9, columns: 9, mines: 10 })).toEqual(
    true
  );
  expect(isValidInput("rows", { rows: 1, columns: 30, mines: 29 })).toEqual(
    true
  );
  expect(isValidInput("columns", { rows: 1, columns: 30, mines: 29 })).toEqual(
    true
  );
  expect(isValidInput("mines", { rows: 1, columns: 30, mines: 29 })).toEqual(
    true
  );
  expect(isValidInput("rows", { rows: 24, columns: 30, mines: 0 })).toEqual(
    true
  );
  expect(isValidInput("columns", { rows: 24, columns: 30, mines: 0 })).toEqual(
    true
  );
  expect(isValidInput("mines", { rows: 24, columns: 30, mines: 0 })).toEqual(
    true
  );
});

it("isValidInput some invalid", () => {
  expect(isValidInput("rows", { rows: 0, columns: 30, mines: 10 })).toEqual(
    false
  );
  expect(isValidInput("columns", { rows: 0, columns: 30, mines: 10 })).toEqual(
    true
  );
  expect(isValidInput("mines", { rows: 0, columns: 30, mines: 10 })).toEqual(
    false
  );
  expect(isValidInput("rows", { rows: 12, columns: 10, mines: 120 })).toEqual(
    true
  );
  expect(
    isValidInput("columns", { rows: 12, columns: 10, mines: 120 })
  ).toEqual(true);
  expect(isValidInput("mines", { rows: 12, columns: 10, mines: 120 })).toEqual(
    false
  );
});
