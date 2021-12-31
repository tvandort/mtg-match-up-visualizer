import { Counter } from "./counter";

test("constructs pairings", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  expect(counter.counts).toEqual({
    "(aaren, adam)": {
      count: 0,
      p1: "aaren",
      p2: "adam",
    },
    "(aaren, tom)": {
      count: 0,
      p1: "aaren",
      p2: "tom",
    },
    "(adam, tom)": {
      count: 0,
      p1: "adam",
      p2: "tom",
    },
  });
});

test("count pairing", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  counter.count([["adam", "tom"]]);
  expect(counter.counts).toEqual({
    "(aaren, adam)": {
      count: 0,
      p1: "aaren",
      p2: "adam",
    },
    "(aaren, tom)": {
      count: 0,
      p1: "aaren",
      p2: "tom",
    },
    "(adam, tom)": {
      count: 1,
      p1: "adam",
      p2: "tom",
    },
  });
});
