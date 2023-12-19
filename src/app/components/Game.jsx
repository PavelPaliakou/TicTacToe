'use client';
import { useState } from "react";
import Board from "./Board.jsx";

export default function Game() {
  const [boardDimension, setBoardDimension] = useState(3);
  const [boardWinLength, setBoardWinLength] = useState(3);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  function handleSetBoardDimension(event) {
    setBoardDimension(event.target.value);
    if(boardWinLength > event.target.value) {
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
      <div className="max-w-5xl w-full flex flex-col items-center p-4 gap-4">
        <h1 className="text-8xl">Tic Tac Toe</h1>

        <div className="flex gap-4 flex-col">

          <div className="flex flex-col items-center">           
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input type="range" min="3" max="5" value={boardDimension} onChange={handleSetBoardDimension} />
              <span>5</span>
            </div>
            <p>Dimension <span>{boardDimension}</span></p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex flex-row gap-2">
              <span>3</span>
              <input type="range" min="3" max={boardDimension} onChange={handleSetBoardWinLength} />
              <span>{boardDimension}</span>
            </div>
            <p>Length to win <span>{boardWinLength}</span></p>
          </div>
          
        </div>

        <div className="w-full max-w-xs flex flex-col items-center">
          {/* <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> */}
          <Board key={boardDimension + boardWinLength} squaresInRow={boardDimension} winLength={boardWinLength}/>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h1>History</h1>
          <ol>{moves}</ol>
        </div>

      </div>
    </main>
  );
}