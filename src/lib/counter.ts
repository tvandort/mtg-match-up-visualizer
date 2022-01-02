import * as $C from "js-combinatorics";
import { createKey } from "./createKey";

export interface CountsMap {
  [key: string]: {
    p1: string;
    p2: string;
    count: number;
  };
}

export class Counts {
  #counts: CountsMap;

  constructor(counts: CountsMap) {
    this.#counts = counts;
  }

  for(playerA: string, playerB: string) {
    const count = this.#counts[createKey([playerA, playerB])];
    if (count) {
      return count.count;
    }
    return 0;
  }

  // Don't modify anything here.
  asMap() {
    return { ...this.#counts };
  }

  lowest() {
    let lowest = Number.MAX_VALUE;
    for (const [, { count }] of Object.entries(this.#counts)) {
      if (count < lowest) {
        lowest = count;
      }
    }
    return lowest;
  }
}

export class Counter {
  #players: string[];
  readonly #counts: CountsMap;

  constructor(players: string[]) {
    this.#players = players.map((player) => player.trim()).sort();
    this.#counts = {};
    const playerPairings = new $C.Combination(this.#players, 2);

    for (const pairing of playerPairings) {
      const key = createKey(pairing);
      this.#counts[key] = {
        p1: pairing[0],
        p2: pairing[1],
        count: 0,
      };
    }
  }

  get counts() {
    return new Counts(this.#counts);
  }

  get lowest() {
    let lowest = Number.MAX_VALUE;
    for (const [, { count }] of Object.entries(this.#counts)) {
      if (lowest > count) {
        lowest = count;
      }
    }
    return lowest;
  }

  count(games: string[][]) {
    for (const game of games) {
      const orderedGame = game.sort();
      const pairs = new $C.Combination(orderedGame, 2).toArray();
      for (const [a, b] of pairs) {
        const key = createKey([a, b]);
        if (!this.#counts[key]) {
          this.#counts[key] = { count: 0, p1: a, p2: b };
          const players = [...this.#players];
          if (!players.includes(a)) {
            players.push(a);
          }
          if (!players.includes(b)) {
            players.push(b);
          }
          this.#players = players.sort();
        }
        this.#counts[key].count += 1;
      }
    }
  }

  get players() {
    return this.#players.map((player) => player);
  }
}
