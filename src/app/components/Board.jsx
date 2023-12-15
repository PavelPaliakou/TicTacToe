'use client';
import Square from "./Square.jsx";

export default function Board({ xIsNext, squares, onPlay }) {
  const squaresInRow = 5;
  const gameFiled = createGameField(squaresInRow);

  function handleClick(cell) {
    if (squares[cell] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[cell] = "X";
    } else {
      nextSquares[cell] = "O";
    }

    onPlay(nextSquares);
  }

  function renderField(gameField) {
    return (
      gameField.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full flex flex-row flex-nowrap">
          {
            row.map((cell, cellIndex) => {
              let style = "";

              if (rowIndex != row.length - 1) {
                style = "border-b-2"
              }

              if (cellIndex != row.length - 1) {
                style += " border-r-2"
              }

              return (
                < Square
                  key={cell}
                  value={squares[cell]}
                  onSquareClick={() => handleClick(cell, cell)}
                  borderStyle={style}
                />
              )

            })
          }
        </div>
      ))
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
      {renderField(gameFiled)}
      <div className="text-4xl">{status}</div>
    </>
  );
}




function isFieldFull(gameFiled, squaresInRow) {
  for (let i = 0; i < squaresInRow; i++) {
      for (let j = 0; j < squaresInRow; j++) {
          if (gameFiled[i][j] == EMPTY) {
              return false;
          }
      }
  }
  gameOver = true;
  gameOverMsg = "DRAW";
  return true;
}

function checkWin(playerSymbol, squaresInRow, winLength) {
  for (let i = 0; i < squaresInRow; i++) {
    for (let j = 0; j < squaresInRow; j++) {
      if (checkLine(i, j, 1, 0, winLength, playerSymbol) ||
        checkLine(i, j, 0, 1, winLength, playerSymbol) ||
        checkLine(i, j, 1, 1, winLength, playerSymbol) ||
        checkLine(i, linesCount - j, 1, -1, winLength, playerSymbol)) {
        gameOver = true;
        if (playerSymbol == PLAYER1_DOT) {
          gameOverMsg = "PLAYER 1 WON";
        }
        if (playerSymbol == PLAYER2_DOT) {
          gameOverMsg = "PLAYER 2 WON";
        }
        return true;
      }
    }
  }
  return false;
}

function checkLine(rowIndex, colIndex, directionX, directionY, winLength, playerSymbol) {
  if (rowIndex + winLength * directionX > linesCount ||
    colIndex + winLength * directionY > linesCount ||
    colIndex + winLength * directionY < -1 ||
    rowIndex + winLength * directionX < -1) {
    return false;
  }
  for (let i = 0; i < l; i++) {
    if (field[colIndex + i * directionX][colIndex + i * directionY] != playerSymbol) {
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
  let filler = 0;
  const gameField = [];

  for (let i = 0; i < squaresInRow; i++) {
    gameField[i] = [];
    for (let j = 0; j < squaresInRow; j++) {
      gameField[i][j] = filler++;
    }
  }

  return gameField;
}