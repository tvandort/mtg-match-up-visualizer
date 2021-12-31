import React, { useState } from "react";
import { Counter, Counts } from "../lib/counter";

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
    { players: string[]; counts: Counts } | undefined
  >();

  const handleCountClick = () => {
    const players = playersText.split(",").sort();
    const games = gamesText.split("\n").map((game) => game.split(","));

    const counter = new Counter(players);

    counter.count(games);

    setResult({ counts: counter.counts, players });
  };

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
        <div>
          <button
            onClick={handleCountClick}
            className="text-white text-lg font-medium bg-blue-500 px-4 py-1 border-1  border-black shadow-lg"
          >
            Count
          </button>
        </div>
      </div>
      <hr className="mb-8" />
      <div>
        {result ? (
          <table className="table-auto border border-gray-500 border-collapse">
            <thead>
              <td></td>
              {result.players.map((player) => (
                <th className="border border-gray-600">{player}</th>
              ))}
            </thead>
            <tbody>
              {result.players.map((playerA) => (
                <tr>
                  <th className="border border-gray-700">{playerA}</th>
                  {result.players.map((playerB) => {
                    if (playerA === playerB) {
                      return (
                        <td className="text-right border border-gray-700">X</td>
                      );
                    } else {
                      return (
                        <td className="text-right border border-gray-700">
                          {result.counts.for(playerA, playerB).count}
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>Click Count to well... Count.</>
        )}
      </div>
    </div>
  );
}

export default App;
