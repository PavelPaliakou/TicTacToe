'use client';

import { useEffect } from "react";

export default function Square({ playerSymbol, onSquareClick, borderStyle }) {
  let className = "cell border-solid border-gray-900 text-clampSm font-bold p-0 w-full text-center " + borderStyle;

  //Set height equal to width
  useEffect(() => {
    let cells = document.querySelectorAll(".cell");
    let width = cells[0].offsetWidth + "px";
    cells.forEach((cell) => {
      cell.style.height = width;
    })
  })

  return (
    <button className={className} onClick={onSquareClick}>
      {playerSymbol}
    </button>
  )
}