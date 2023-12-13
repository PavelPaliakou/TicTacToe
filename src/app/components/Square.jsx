'use client';

export default function Square({ value, onSquareClick }) {
  let cells = null;

  if (typeof window !== "undefined") {
    cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.style.height = cell.offsetWidth + "px";
    })
  }

  return (
    <button
      className="cell bg-white border-solid border-gray-900 border-2 text-2xl font-bold p-0 m-1 w-full h-9 text-center"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )
}