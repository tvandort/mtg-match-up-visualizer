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
    return this.#counts[createKey([playerA, playerB])];
  }
}

export class Counter {
  readonly #players: string[];
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

  count(games: string[][]) {
    for (const game of games) {
      const orderedGame = game.sort();
      const pairs = new $C.Combination(orderedGame, 2).toArray();
      for (const pair of pairs) {
        const key = createKey(pair);
        this.#counts[key].count += 1;
      }
    }
  }
}
