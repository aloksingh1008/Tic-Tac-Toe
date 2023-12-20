import { useState } from "react";

import Players from "./components/Players.jsx";
import GameBoard from "./components/GameBoard.jsx";
// import Log from "./components/Log.jsx";
import TurnHistory from "./components/TurnHistory.jsx";
import { WINNING_COMBINATIONS } from "./Winning-combo.js"
import GameOver from "./components/GameOver.jsx";
function derivedActivePlayer(gameTurns) {
  let cur = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    cur = "O";
  }
  return cur;
}
function derivedWinner(gameboard, player) {
  let winner = null;
  for (const combo of WINNING_COMBINATIONS) {
    const first = gameboard[combo[0].row][combo[0].column];
    const second = gameboard[combo[1].row][combo[1].column];
    const third = gameboard[combo[2].row][combo[2].column];
    if (first && first === second && second === third) {
      winner = player[first];
      return winner;
    }
  }
  return winner;
}
const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function derivedGameBoard(gameTurns) {
  let gameboard = [...initialGameBoard.map((row) => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameboard[row][col] = player;
  }
  return gameboard;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [player, setPlayer] = useState(PLAYERS);
  function handlePlayerNameChange(symbol, newName) {
    setPlayer((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }
  function handleRematch() {
    setGameTurns(() => {
      return [];
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prev) => {
      let curPlayer = derivedActivePlayer(prev);
      const newarray = [
        { square: { row: rowIndex, col: colIndex }, player: curPlayer },
        ...prev,
      ];
      // console.log(newarray);
      return newarray;
    });
  }
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameboard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameboard, player);
  const hasDraw = gameTurns.length === 9 && !winner;
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Players
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          gameboard={gameboard}
        />
      </div>
      <TurnHistory turns={gameTurns} />
    </main>
  );
}

export default App;
