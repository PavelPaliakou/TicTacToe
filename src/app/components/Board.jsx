'use client';
import Square from "./Square.jsx";
import { useState } from "react";
let gameOver = false;
let playerSymbol = "";
let gameStatusMsg = "";

export default function TestBoard({ squaresInRow, winLength }) {
    const [gameField, setGameField] = useState(createGameField);
    const [isNextTurn, setIsNextTurn] = useState(true);

    function createGameField() {
        let filler = 0;
        const gameField = [];

        for (let i = 0; i < squaresInRow; i++) {
            gameField[i] = [];
            for (let j = 0; j < squaresInRow; j++) {
                gameField[i][j] = null;
            }
        }

        return gameField;
    }

    function handleClickArray(rowIndex, colIndex) {
        if (!gameOver) {
            if (!gameField[rowIndex][colIndex]) {
                if (isNextTurn) {
                    playerSymbol = "X";
                } else {
                    playerSymbol = "0";
                }
        
                const nextGameField = gameField.slice();
                nextGameField[rowIndex][colIndex] = playerSymbol;
        
                setGameField(nextGameField);
                setIsNextTurn(!isNextTurn);

                checkWin();
                isFieldFull();

            } else {
                console.log("this cell is already taken");
                return;
            }
        } else {
            console.log("game is over");
            return;
        }
    }

    function isFieldFull() {
        for (let i = 0; i < squaresInRow; i++) {
            for (let j = 0; j < squaresInRow; j++) {
                if (!gameField[i][j]) {
                    return false;
                }
            }
        }
        gameOver = true;
        gameStatusMsg = "DRAW";
        return true;
    }

    // check rows
    // checkLine(i, j, 1, 0, winLength, playerSymbol, squaresInRow) ||
    // check columns
    // checkLine(i, j, 0, 1, winLength, playerSymbol, squaresInRow) ||
    // check diagonals from top-left to bottom-right
    // checkLine(i, j, 1, 1, winLength, playerSymbol, squaresInRow) ||
    // check diagonals from top-right to bottom-left
    // checkLine(i, squaresInRow - j, 1, -1, winLength, playerSymbol, squaresInRow)
    function checkWin() {
        for (let i = 0; i < squaresInRow; i++) {
            for (let j = 0; j < squaresInRow; j++) {
                if (checkLine(i, j, 1, 0, winLength, playerSymbol, squaresInRow) ||
                    checkLine(i, j, 0, 1, winLength, playerSymbol, squaresInRow) ||
                    checkLine(i, j, 1, 1, winLength, playerSymbol, squaresInRow) ||
                    checkLine(i, squaresInRow - j, 1, -1, winLength, playerSymbol, squaresInRow)) {

                    gameOver = true;
                    gameStatusMsg = `Player ${playerSymbol} won!`;
                    return true;
                }
            }
        }
        return false;
    }

    function checkLine(rowIndex, colIndex, directionX, directionY) {
        if (rowIndex + winLength * directionX > squaresInRow ||
            colIndex + winLength * directionY > squaresInRow ||
            colIndex + winLength * directionY < -1 ||
            rowIndex + winLength * directionX < -1) {
            return false;
        }
        for (let i = 0; i < winLength; i++) {
            if (gameField[rowIndex + i * directionX][colIndex + i * directionY] != playerSymbol) {
                return false;
            }
        }
        return true;
    }

    function renderField(gameField) {
        return (
            gameField.map((row, rowIndex) => (
                <div key={rowIndex} className="w-full flex flex-row flex-nowrap">
                    {
                        row.map((cell, colIndex) => {
                            let style = "";

                            if (rowIndex != row.length - 1) {
                                style = "border-b-2"
                            }

                            if (colIndex != row.length - 1) {
                                style += " border-r-2"
                            }

                            const uniqueKey = rowIndex * squaresInRow + colIndex;
                            return (
                                < Square
                                    key={uniqueKey}
                                    playerSymbol={gameField[rowIndex][colIndex]}
                                    onSquareClick={() => handleClickArray(rowIndex, colIndex, cell)}
                                    borderStyle={style}
                                />
                            )

                        })
                    }
                </div>
            ))
        )
    }

    return (
        <>
            {renderField(gameField)}
            <div className="text-4xl">{gameStatusMsg}</div>
        </>
    );
}
