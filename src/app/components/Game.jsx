'use client';
import { useState } from "react";
import Board from "./Board.jsx";


//TODO: change style for h1
export default function Game() {
  const [boardDimension, setBoardDimension] = useState(3);
  const [boardWinLength, setBoardWinLength] = useState(3);
  const [gameType, setGameType] = useState(true);
  const [newGame, setNewGame] = useState(false);

  function handleNewGame() {
    setNewGame(!newGame);
  }

  function handleGameType(event) {
    setGameType(event.target.value);
  }

  function handleSetBoardDimension(event) {
    setBoardDimension(event.target.value);
    if (boardWinLength > event.target.value) {
      setBoardWinLength(event.target.value);
    }
  }

  function handleSetBoardWinLength(event) {
    let winLength = event.target.value;
    if (winLength > boardDimension) {
      winLength = boardDimension;
    }
    setBoardWinLength(winLength);
  }

  return (
    <main className="flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col items-center px-4">
        <h1 className="text-clamp">Tic Tac Toe</h1>

        <div className="flex gap-4 flex-col">

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input type="range" min="3" max="5"
                value={boardDimension}
                onChange={handleSetBoardDimension}
              />
              <span>5</span>
            </div>
            <p>Dimension <span>{boardDimension}</span></p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input type="range" min="3" max={boardDimension}
                value={boardWinLength}
                onChange={handleSetBoardWinLength}
              />
              <span>{boardDimension}</span>
            </div>
            <p>Length to win <span>{boardWinLength}</span></p>
          </div>

          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col items-center">
              <input type="radio" name="gameType" value={true} onChange={handleGameType} defaultChecked />
              <label htmlFor="gameType">PvP</label>
            </div>
            <div className="flex flex-col items-center">
              <input type="radio" name="gameType" value={false} onChange={handleGameType} />
              <label htmlFor="gameType">PvAI</label>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xs flex flex-col items-center">
          <Board
            key={boardDimension + boardWinLength + gameType + newGame}
            squaresInRow={boardDimension}
            winLength={boardWinLength} 
            gameType={gameType}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button onClick={handleNewGame}>New game</button>
        </div>

      </div>
    </main>
  );
}