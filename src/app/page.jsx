import Game from "./components/Game.jsx";

export default function Home() {
  return (
    <div>
      <Game />
    </div>
  )
}


// 'use client';
// import { useState } from "react";
// import Board from "./components/Board.jsx";

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <main className="flex flex-col items-center">
//       <div className="max-w-5xl w-full flex flex-col items-center p-4 gap-4">
//         <h1 className="text-8xl">Tic Tac Toe</h1>
//         <div className="w-full max-w-xs flex flex-col items-center">
//           <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
//         </div>
//         <div className="flex flex-col items-center gap-4">
//           <h1>History</h1>
//           <ol>{moves}</ol>
//         </div>
//       </div>
//     </main>
//   );
// }