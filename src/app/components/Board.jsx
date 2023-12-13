'use client';
import Square from "./Square.jsx";

export default function Board({ xIsNext, squares, onPlay }) {
  const squaresInRow = 3;

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  function createBoard(gameField) {
    return (
      gameField.map((rowIndex) => createRow(rowIndex))
    )
  }

  function createRow(row) {
    return (
      <div key={row} className="w-full flex flex-row flex-nowrap">
        {
          row.map((cell) =>
            <Square
              key={cell}
              value={squares[cell]}
              onSquareClick={() => handleClick(cell)}
            />
          )
        }
      </div>
    )
  }


  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      {createBoard(createGameField(squaresInRow))}
      <div className="text-4xl">{status}</div>
    </>
  );
}

function  checkLine(cx, cy, vx, vy, l, ox) {
  if (cx + l * vx > linesCount || cy + l * vy > linesCount || cy + l * vy < -1 || cx + l * vx < -1) {
      return false;
  }
  for (let i = 0; i < l; i++) {
      if (field[cx + i * vx][cy + i * vy] != ox) {
          return false;
      }
  }
  return true;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function createGameField(squaresInRow) {
  let index = 0;
  const gameField = [];
  for (let i = 0; i < squaresInRow; i++) {
    gameField[i] = [];
    for (let j = 0; j < squaresInRow; j++) {
      gameField[i][j] = index++;
    }
  }
  return gameField;
}