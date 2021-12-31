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
    console.log({ players, games, counter });

    counter.count(games);

    setResult({ counts: counter.counts, players });
  };

  return (
    <div className="App">
      <div>
        <label>
          Players:&nbsp;
          <textarea
            value={playersText}
            onChange={({ target: { value } }) => setPlayersText(value)}
          />
        </label>
      </div>
      <div>
        <label>
          Games:&nbsp;
          <textarea
            value={gamesText}
            onChange={({ target: { value } }) => setGamesText(value)}
          />
        </label>
      </div>
      <br />
      <div>
        <button onClick={handleCountClick}>Count</button>
      </div>
      <hr />
      <div>
        {result ? (
          <table>
            <thead>
              <td></td>
              {result.players.map((player) => (
                <th>{player}</th>
              ))}
            </thead>
            <tbody>
              {result.players.map((playerA) => (
                <tr>
                  <th>{playerA}</th>
                  {result.players.map((playerB) => {
                    if (playerA === playerB) {
                      return <td>X</td>;
                    } else {
                      return (
                        <td>{result.counts.for(playerA, playerB).count}</td>
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
