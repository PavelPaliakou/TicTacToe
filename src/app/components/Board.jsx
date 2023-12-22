'use client';
import Square from "./Square.jsx";
import { useState } from "react";
let playerMark = "";

//TODO: change color for win sequence
//TODO: REACT IS FUCKING BUL SHIT!!!!!!!!!!!!!!!!!!!

//FIXME: check from top-right to bottom-left doesn't work

export default function Board({ squaresInRow, winLength, gameType }) {
    const [gameField, setGameField] = useState(createGameField());
    const [isNextTurn, setIsNextTurn] = useState(true);
    let [gameOver, setGameOver] = useState(false);
    let [gameStatusMsg, setGameStatusMsg] = useState("");
    const AIMark = "O";

    console.log("gameOver = " + gameOver);
    console.log("message = " + gameStatusMsg);
    
    function AITurn() {
        let testGameField = gameField.slice();

        //If AI has (winLength - 1) sequence, put AI's mark for win
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (!gameField[i][j]) {
                    gameField[i][j] = AIMark;

                    console.log("AI has wining sequence? = " 
                        + checkWin(AIMark + "in [" + i + "][" + j + "]"));
                    
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

                    console.log("Player has wining sequence? = " 
                        + checkWin(playerMark + "in [" + i + "][" + j + "]"));

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

    function handleClick(rowIndex, colIndex) {
        if (!gameOver) {
            if (!gameField[rowIndex][colIndex]) {
                if (isNextTurn) {
                    playerMark = "X";
                } else {
                    playerMark = "O";
                }

                gameField[rowIndex][colIndex] = playerMark;
                
                checkGameStatus(playerMark)

                if (!gameOver){
                    if (gameType === "true") {
                        setIsNextTurn(!isNextTurn);
                    } else {
                        AITurn();  
                    }
                }

                checkGameStatus(AIMark)

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

    function checkGameStatus(mark) {
        if (checkWin(mark)) {
            gameOver = true;
            gameStatusMsg = `Player ${mark} won!`;
        } else {
            if (isFieldFull()) {
                gameOver = true;
                gameStatusMsg = "DRAW";
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

    function checkWin(mark) {
        /*check rows
        checkLine(i, j, 1, 0, mark)
        check columns
        checkLine(i, j, 0, 1, mark)
        check diagonals from top-left to bottom-right
        checkLine(i, j, 1, 1, mark)
        check diagonals from top-right to bottom-left
        checkLine(i, gameField.length - j, 1, -1, mark))*/
        for (let i = 0; i < gameField.length; i++) {
            for (let j = 0; j < gameField.length; j++) {
                if (checkLine(i, j, 1, 0, mark) ||
                    checkLine(i, j, 0, 1, mark) ||
                    checkLine(i, j, 1, 1, mark) ||
                    checkLine(i, gameField.length - j, 1, -1, gameField, mark)) {

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
        for (let i = 0; i < winLength; i++) {
            if (gameField[rowIndex + i * directionX][colIndex + i * directionY] != mark) {
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
