import { Counter } from "./counter";
import { Printer } from "./terminalPrinter";

test.todo("add tests");

test("prints header", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  counter.count([["adam", "tom"]]);

  const printer = new Printer(players, counter.counts);
  expect(printer.header()).toBe(" \taaren\tadam\ttom");
});

test("prints line 2", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  counter.count([["adam", "tom"]]);

  const printer = new Printer(players, counter.counts);
  expect(printer.row(2)).toBe("adam\t0\tX\t1");
});

test("prints table", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  counter.count([["adam", "tom"]]);

  const printer = new Printer(players, counter.counts);
  expect(printer.table()).toBe(
    ` \taaren\tadam\ttom\nadam\t0\tX\t1\ntom\t0\t1\tX`
  );
});
