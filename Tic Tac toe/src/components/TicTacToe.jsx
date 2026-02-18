import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("Playing");

  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const winningPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || status !== "Playing") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner) {
      setStatus(`${winner} Wins`);
      setScore((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    } else if (newBoard.every(cell => cell !== null)) {
      setStatus("Draw");
      setScore((prev) => ({
        ...prev,
        draw: prev.draw + 1,
      }));
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const rematch = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setStatus("Playing");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

      
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Status: {status}
      </h1>

      
      <div className="flex gap-6 sm:gap-12 mb-6 text-center">
        <div className="font-bold text-lg">
          <p>X</p>
          <p>{score.X} Wins</p>
        </div>

        <div className="font-bold text-lg">
          <p>O</p>
          <p>{score.O} Wins</p>
        </div>

        <div className="font-bold text-lg">
          <p>=</p>
          <p>{score.draw} Draws</p>
        </div>
      </div>

     
      <div className="grid grid-cols-3 ">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                       bg-white border border-gray-400
                       text-2xl sm:text-3xl md:text-4xl
                       font-bold flex items-center justify-center
                       cursor-pointer
                       hover:bg-gray-200 transition"
          >
            {cell}
          </button>
        ))}
      </div>

     
      <button
        onClick={rematch}
        className="mt-6 px-6 py-3 bg-gray-300 hover:bg-gray-400
                   rounded-xl text-lg font-semibold
                   transition active:scale-95"
      >
        Rematch
      </button>

    </div>
  );
};

export default TicTacToe;
