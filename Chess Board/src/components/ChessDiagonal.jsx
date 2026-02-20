import React, { useState } from 'react';

const ChessDiagonal = () => {
  const [selectedBox, setSelectedBox] = useState(null); 

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  const handleClick = (r, c) => {
    setSelectedBox({ r, c });
  };

  const getBoxColor = (r, c) => {
    if (!selectedBox) {
      return (r + c) % 2 === 0 ? 'bg-gray-100' : 'bg-black';
    }

    const { r: selR, c: selC } = selectedBox;

    if (r === selR && c === selC) return 'bg-red-800 shadow-inner scale-95';

    if (Math.abs(r - selR) === Math.abs(c - selC)) {
      return 'bg-red-500';
    }

    return (r + c) % 2 === 0 ? 'bg-gray-100' : 'bg-black';
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-black text-lg font-semibold mb-6 ">
        click on any cell to color diagonally
      </h1>

      <div className="grid grid-cols-8 w-full max-w-[500px] aspect-square border-2 ">
        {rows.map((r) =>
          cols.map((c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              className={`
                ${getBoxColor(r, c)}
                cursor-pointer transition-all duration-200
                flex items-center justify-center 
              `}
            >
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default ChessDiagonal;