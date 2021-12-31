import { Counts } from "./counter";
import { createKey } from "./createKey";

export class Printer {
  readonly #players: string[];
  readonly #counts: Counts;

  constructor(players: string[], counts: Counts) {
    this.#players = players.sort();
    this.#counts = counts;
  }

  header() {
    return " \t" + this.#players.join("\t");
  }

  row(number: number) {
    if (number < 1 || number > 1 + this.#players.length) {
      throw new Error("Out of bounds.");
    }

    if (number === 1) {
      return this.header();
    }

    if (number > 1) {
      const line = [];
      const headerPlayer = this.#players[number - 1];
      line.push(headerPlayer);

      for (const player of this.#players) {
        if (player === headerPlayer) {
          line.push("X");
        } else {
          line.push(this.#counts.for(headerPlayer, player).count);
        }
      }

      return line.join("\t");
    }

    return "";
  }

  table() {
    const lines = [];
    for (let index = 0; index < this.#players.length; index++) {
      lines.push(this.row(index + 1));
    }

    return lines.join("\n");
  }
}
