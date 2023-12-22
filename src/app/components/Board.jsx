'use client';
import Square from "./Square.jsx";
import { useState } from "react";
let playerMark = "";
let variable = 0;

//TODO: change color for win sequence

export default function TestBoard({ squaresInRow, winLength, gameType }) {
    const [gameField, setGameField] = useState(createGameField());
    const [isNextTurn, setIsNextTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [gameStatusMsg, setGameStatusMsg] = useState("");
    console.log("gameOver = " + gameOver + " message = " + gameStatusMsg);

    function AITurn() {
        console.log("AI turn and check player wining sequence");
        //If AI has wining sequence
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    if (checkWin) {
                        console.log("inside check player sequence")
                        if (!isNextTurn) {
                            playerMark = "X";
                        } else {
                            playerMark = "0";
                        }
                        gameField[i][j] = playerMark;
                        return;
                    }
                }
            }
        }

        console.log("Change player symbol to check AI winning sequence");

        if (!isNextTurn) {
            playerMark = "X";
        } else {
            playerMark = "0";
        }

        //If player has wining sequence then AI put its mark here
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    if (checkWin) {
                        gameField[i][j] = playerMark;
                        return;
                    }
                }
            }
        }

        //If AI and player haven't wining sequence then AI put random mark
        console.log("Randomly put AI's mark on board");
        let x = 0;
        let y = 0;
        do {
            x = Math.floor(Math.random() * gameField.length);
            y = Math.floor(Math.random() * gameField.length);
        } while (!gameField[x][y]);

        const nextGameField = gameField.slice();
        nextGameField[x][y] = playerMark;

        setGameField(nextGameField);

    }

    function handleClick(rowIndex, colIndex) {
        if (!gameOver) {
            if (!gameField[rowIndex][colIndex]) {
                if (isNextTurn) {
                    playerMark = "X";
                } else {
                    playerMark = "0";
                }

                const nextGameField = gameField.slice();
                nextGameField[rowIndex][colIndex] = playerMark;
                setGameField(nextGameField);

                console.log("variable = " + variable);
                variable += 10;
                console.log("variable = " + variable);

                if (checkWin()) {
                    setGameOver(true);
                    setGameStatusMsg(`Player ${playerMark} won!`);
                } else {
                    if (isFieldFull()) {
                        setGameOver(true);
                        setGameStatusMsg("DRAW");
                    }
                }

                if (gameType) {
                    setIsNextTurn(!isNextTurn);
                } else {
                    AITurn();  
                }
                
            } else {
                console.log("this cell is already taken");
                return;
            }
        } else {
            console.log("game is over");
            return;
        }
    }

    function checkGameStatus() {
        if (checkWin()) {
            setGameOver(true);
            setGameStatusMsg(`Player ${playerMark} won!`);
        } else {
            if (isFieldFull()) {
                setGameOver(true);
                setGameStatusMsg("DRAW");
            }
        }
    }

    function isFieldFull() {
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    function checkWin() {
        /*check rows
        checkLine(i, j, 1, 0, winLength, playerSymbol, gameField.length) ||
        check columns
        checkLine(i, j, 0, 1, winLength, playerSymbol, gameField.length) ||
        check diagonals from top-left to bottom-right
        checkLine(i, j, 1, 1, winLength, playerSymbol, gameField.length) ||
        check diagonals from top-right to bottom-left
        checkLine(i, gameField.length - j, 1, -1, winLength, playerSymbol, gameField.length)*/
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (checkLine(i, j, 1, 0, winLength, playerMark, gameField.length) ||
                    checkLine(i, j, 0, 1, winLength, playerMark, gameField.length) ||
                    checkLine(i, j, 1, 1, winLength, playerMark, gameField.length) ||
                    checkLine(i, gameField.length - j, 1, -1, winLength, playerMark, gameField.length)) {

                    return true;
                }
            }
        }
        return false;
    }

    function checkLine(rowIndex, colIndex, directionX, directionY) {
        if (rowIndex + winLength * directionX > gameField.length ||
            colIndex + winLength * directionY > gameField.length ||
            colIndex + winLength * directionY < -1 ||
            rowIndex + winLength * directionX < -1) {
            return false;
        }
        for (let i = 0; i < winLength; i++) {
            if (gameField[rowIndex + i * directionX][colIndex + i * directionY] != playerMark) {
                return false;
            }
        }
        return true;
    }

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
                                    onSquareClick={() => handleClick(rowIndex, colIndex, cell)}
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
            <div className="text-4xl mt-12">{gameStatusMsg}</div>
        </>
    );
}
