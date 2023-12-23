'use client';
import Square from "./Square.jsx";
import { useState } from "react";
let playerMark = "";

export default function Board({ squaresInRow, winLength, gameType }) {
    const [gameField, setGameField] = useState(createGameField());
    const [isNextTurn, setIsNextTurn] = useState(true);
    let [gameOver, setGameOver] = useState(false);
    let [gameStatusMsg, setGameStatusMsg] = useState("Player X's turn");
    let [winSequence, setWinSequence] = useState([]);
    const AIMark = "O";
    let checkStatus = false;    //to avoid paint when play with AI

    console.log("gameOver = " + gameOver);
    console.log("message = " + gameStatusMsg);

    function handleClick(rowIndex, colIndex) {
        if (!gameOver) {
            if (!gameField[rowIndex][colIndex]) {
                if (isNextTurn) {
                    playerMark = "X";
                } else {
                    playerMark = "O";
                }

                gameField[rowIndex][colIndex] = playerMark;

                checkGameStatus(playerMark);

                if (!gameOver) {
                    if (gameType === "true") {
                        if (isNextTurn) {
                            gameStatusMsg = `Player O's turn`;
                        } else {
                            gameStatusMsg = `Player X's turn`;
                        }
                        
                        setIsNextTurn(!isNextTurn);
                    } else {
                        AITurn();
                    }
                }

                checkGameStatus(AIMark);

                const nextGameField = gameField.slice();
                setGameField(nextGameField);

                setGameOver(gameOver);
                setGameStatusMsg(gameStatusMsg);

            } else {
                console.log("this cell is already taken");
                return;
            }
        } else {
            console.log("game is over");
            return;
        }
    }

    function AITurn() {
        //If AI has (winLength - 1) sequence, put AI's mark for win
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    gameField[i][j] = AIMark;

                    console.log("Player has wining sequence in [" + i + "][" + j + "]? = "
                        + checkWin(AIMark));

                    if (checkWin(AIMark)) {
                        gameField[i][j] = AIMark;
                        return;
                    }

                    gameField[i][j] = null;
                }
            }
        }

        //If player has (winLength - 1) sequence then AI put it's mark to prevent player from win
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    gameField[i][j] = playerMark;

                    console.log("Player has wining sequence in [" + i + "][" + j + "]? = "
                        + checkWin(playerMark));

                    if (checkWin(playerMark)) {
                        gameField[i][j] = AIMark;
                        return;
                    }

                    gameField[i][j] = null;
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
        } while (gameField[x][y]);

        gameField[x][y] = AIMark;
    }

    function checkGameStatus(mark) {
        checkStatus = true;

        if (checkWin(mark)) {
            gameOver = true;
            gameStatusMsg = `Player ${mark} won!`;
        } else {
            if (isFieldFull()) {
                gameOver = true;
                gameStatusMsg = "DRAW";
            }
        }

        checkStatus = false;
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

    function checkWin(mark) {
        /*check rows
        checkLine(i, j, 1, 0, mark)
        check columns
        checkLine(i, j, 0, 1, mark)
        check diagonals from top-left to bottom-right
        checkLine(i, j, 1, 1, mark)
        check diagonals from top-right to bottom-left
        checkLine(i, (gameField.length - 1 - j), 1, -1, mark))*/
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (checkLine(i, j, 1, 0, mark) ||
                    checkLine(i, j, 0, 1, mark) ||
                    checkLine(i, j, 1, 1, mark) ||
                    checkLine(i, (gameField.length - 1 - j), 1, -1, mark)) {

                    return true;
                }
            }
        }
        return false;
    }
    
    function checkLine(rowIndex, colIndex, directionX, directionY, mark) {
        if (rowIndex + winLength * directionX > gameField.length ||
            colIndex + winLength * directionY > gameField.length ||
            colIndex + winLength * directionY < -1 ||
            rowIndex + winLength * directionX < -1) {
            return false;
        }
        
        const tempWinSequence = [];

        for (let i = 0; i < winLength; i++) {
            if (gameField[rowIndex + i * directionX][colIndex + i * directionY] != mark) {
                return false;
            }
            tempWinSequence.push([rowIndex + i * directionX, colIndex + i * directionY]);
        }

        //Set win sequence if it not AI's turn check
        if((tempWinSequence.length == winLength) && checkStatus) {
            setWinSequence(tempWinSequence);
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

                            if(winSequence.length == winLength){
                                winSequence.forEach((row) => {
                                    if(rowIndex == row[0] && colIndex == row[1]){
                                        style += " text-red-600";
                                    }                
                                });
                            }

                            const uniqueKey = rowIndex * squaresInRow + colIndex;
                            return (
                                < Square
                                    key={uniqueKey}
                                    playerSymbol={gameField[rowIndex][colIndex]}
                                    onSquareClick={() => handleClick(rowIndex, colIndex, cell)}
                                    squareStyle={style}
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
            <div className="text-4xl mt-4">{gameStatusMsg}</div>
        </>
    );
}
