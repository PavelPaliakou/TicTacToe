'use client';

import { useEffect } from "react";

export default function Square({ playerSymbol, onSquareClick, squareStyle }) {
  let className = "cell border-solid border-gray-900 text-5xl font-bold p-0 w-full text-center " + squareStyle;

  //Set height equal to width
  useEffect(() => {
    let cells = document.querySelectorAll(".cell");
    let width = cells[0].offsetWidth + "px";
    cells.forEach((cell) => {
      cell.style.height = width;
    })
  })

  return (
    <button className={className} onClick={onSquareClick} aria-label="game square">
      {playerSymbol}
    </button>
  )
}