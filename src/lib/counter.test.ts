import { Counter } from "./counter";

test("constructs pairings", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  expect(counter.counts.asMap()).toEqual({
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

  expect(counter.counts.asMap()).toEqual({
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

test("new player", () => {
  const players = ["adam", "tom", "aaren"];
  const counter = new Counter(players);
  counter.count([["adam", "tom", "bob"]]);

  expect(counter.counts.asMap()).toEqual({
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
    "(adam, bob)": {
      count: 1,
      p1: "adam",
      p2: "bob",
    },
    "(adam, tom)": {
      count: 1,
      p1: "adam",
      p2: "tom",
    },
    "(bob, tom)": {
      count: 1,
      p1: "bob",
      p2: "tom",
    },
  });

  expect(counter.counts.for("adam", "bob")).toMatchInlineSnapshot(`1`);
});
