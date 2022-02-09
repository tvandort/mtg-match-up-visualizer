import React, { useEffect, useState } from "react";
import { Counter, Counts } from "../lib/counter";
import cx from "classnames";

import "./App.css";

const players = [
  "Tom",
  "Aaren",
  "Adam",
  "Chris L",
  "Chris B",
  "Josh",
  "Spencer",
  "Peter",
  "Jesse",
  "Ian",
];

function App() {
  const [playersText, setPlayersText] = useState(players.join(","));
  const [gamesText, setGamesText] = useState("Tom, Adam");
  const [result, setResult] = useState<
    | {
        players: string[];
        counts: Counts;
        lowest: number;
        gamesPlayed: (player: string) => number;
      }
    | undefined
  >();

  useEffect(() => {
    const players = playersText
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry)
      .sort();
    const weeks = gamesText.split("\n").map((week) =>
      week.split("|").map((game) =>
        game
          .split("\t")
          .map((entry) => entry.split(","))
          .flatMap((entry) => entry)
          .map((entry) => entry.trim())
          .filter((entry) => entry)
      )
    );

    const counter = new Counter(players);

    for (const week of weeks) {
      counter.count(week);
    }

    setResult({
      counts: counter.counts,
      players: counter.players,
      lowest: counter.lowest,
      gamesPlayed: (player: string) => counter.countFor(player),
    });
  }, [playersText, gamesText]);

  return (
    <div className="App">
      <div className="mb-8">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex content-center">
            <label htmlFor="players">Players:&nbsp;</label>
            <textarea
              id="players"
              className="resize border border-gray-500"
              value={playersText}
              onChange={({ target: { value } }) => setPlayersText(value)}
            />
          </div>
          <div className="flex content-center">
            <label htmlFor="games">Games:&nbsp;</label>
            <textarea
              id="games"
              className="resize border border-gray-500"
              value={gamesText}
              onChange={({ target: { value } }) => setGamesText(value)}
            />
          </div>
        </div>
      </div>
      <hr className="mb-8" />
      <div>
        {result ? (
          <>
            <table className="table-auto border border-gray-500 border-collapse">
              <thead>
                <tr>
                  <td />
                  {result.players.map((player) => (
                    <th className="border border-gray-600" key={player}>
                      {player}
                    </th>
                  ))}
                  <td>Total games</td>
                </tr>
              </thead>
              <tbody>
                {result.players.map((playerA) => (
                  <tr key={playerA}>
                    <th className="border border-gray-700">{playerA}</th>
                    {result.players.map((playerB) => {
                      const key = `(${playerA}, ${playerB})`;
                      if (playerA === playerB) {
                        return (
                          <td
                            className="text-right border border-gray-700 bg-black"
                            key={key}
                          ></td>
                        );
                      } else {
                        const count = result.counts.for(playerA, playerB);
                        return (
                          <td
                            className={cx("text-right border border-gray-700", {
                              "bg-red-300": count === result.lowest,
                              "bg-orange-300": count === result.lowest + 1,
                              "bg-green-300": count === result.lowest + 3,
                              "bg-purple-300": count === result.lowest + 4,
                            })}
                            key={key}
                          >
                            {count}
                          </td>
                        );
                      }
                    })}
                    <td className="text-right border border-gray-700">
                      {result.gamesPlayed(playerA)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <>Click Count to well... Count.</>
        )}
      </div>
    </div>
  );
}

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="text-white text-lg font-medium bg-blue-500 px-4 py-1 border-1  border-black shadow-lg"
    >
      Count
    </button>
  );
}

export default App;
