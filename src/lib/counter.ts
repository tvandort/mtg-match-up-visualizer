import * as $C from 'js-combinatorics';
import { createKey } from './createKey';

export interface Counts {
  [key: string]: {
    p1: string;
    p2: string;
    count: number;
  };
}

export class Counter {
  readonly #players: string[];
  readonly #counts: Counts;

  constructor(players: string[]) {
    this.#players = players.sort();
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
    return this.#counts;
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
