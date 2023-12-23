'use client';
import { useState } from "react";
import Board from "./Board.jsx";

export default function Game() {
  const [boardDimension, setBoardDimension] = useState(3);
  const [boardWinLength, setBoardWinLength] = useState(3);
  const [gameType, setGameType] = useState("true");
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
    <main className="flex flex-col items-center text-2xl mt-12">
      <div className="max-w-5xl w-full flex flex-col items-center px-4">
        <h1 className="text-clamp leading-tight">Tic Tac Toe</h1>

        <div className="flex flex-col">

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input id="boardDimension" type="range" min="3" max="5"
                value={boardDimension}
                onChange={handleSetBoardDimension}
              />
              <span>5</span>
            </div>
            <label for="boardDimension">Dimension <span>{boardDimension}</span></label>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input id="boardWinLength" type="range" min="3" max={boardDimension}
                value={boardWinLength}
                onChange={handleSetBoardWinLength}
              />
              <span>{boardDimension}</span>
            </div>
            <label for="boardWinLength">Length to win <span>{boardWinLength}</span></label>
          </div>

          <fieldset className="flex flex-row justify-evenly mt-4">
            <legend className="hidden">Game type</legend>
            <div className="flex flex-row items-center gap-4">
              <input id="PvPType" type="radio" name="gameType" value={"true"} onChange={handleGameType} defaultChecked />
              <label for="PvPType">PvP</label>
            </div>
            <div className="flex flex-row items-center gap-4">
              <input id="PvAIType" type="radio" name="gameType" value={"false"} onChange={handleGameType} />
              <label for="PvAIType">PvAI</label>
            </div>
          </fieldset>

        </div>

        <div className="w-full max-w-xs flex flex-col items-center my-4">
          <Board
            key={boardDimension + boardWinLength + gameType + newGame}
            squaresInRow={boardDimension}
            winLength={boardWinLength}
            gameType={gameType}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button className="border-dashed hover:border-solid border-2 border-black px-4" onClick={handleNewGame}>New game</button>
        </div>

      </div>
    </main>
  );
}