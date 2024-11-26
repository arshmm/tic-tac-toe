import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import {
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "./helpers/utils";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const currPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rI, cI) => {
    setGameTurns((prevS) => {
      let currPlayer = deriveActivePlayer(prevS);
      return [{ square: { row: rI, col: cI }, player: currPlayer }, ...prevS];
    });
  };
  const handleRestart = () => {
    console.log("game restarted");
    setGameTurns([]);
    winner = null;
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevS) => {
      return { ...prevS, [symbol]: newName };
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="player 1"
            symbol="X"
            isActive={currPlayer == "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="player 2"
            symbol="O"
            isActive={currPlayer == "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver handleRestart={handleRestart} winner={winner} />
        )}
        <GameBoard gameBoard={gameBoard} OnSelectSquare={handleSelectSquare} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
