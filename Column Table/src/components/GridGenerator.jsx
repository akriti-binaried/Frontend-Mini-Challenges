import React, { useState } from "react";

const GridGenerator = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

 
  const totalBoxes = rows * cols;

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">

     
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center ">

        
        <div className="flex flex-col items-center">
          <label className="font-semibold mb-1">
            Rows:: {rows}
          </label>
          <input
            type="range"
            min="2"
            max="8"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-40"
          />
        </div>

       
        <div className="flex flex-col items-center">
          <label className="font-semibold mb-1">
            Columns:: {cols}
          </label>
          <input
            type="range"
            min="2"
            max="8"
            value={cols}
            onChange={(e) => setCols(Number(e.target.value))}
            className="w-40"
          />
        </div>
      </div>

     
      <div className="flex items-center justify-center w-full h-full">
  <div
    className="grid gap-2"
    style={{
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      width: `min(90vw, ${cols * 80}px)`,
      height: `min(70vh, ${rows * 80}px)`,
    }}
  >
    {[...Array(rows * cols)].map((_, index) => {
      const number =
        (index % rows) * cols + Math.floor(index / rows) + 1;

      return (
        <div
          key={index}
          className="
            flex items-center justify-center
            w-full h-full
            aspect-square border border-black text-black font-bold
          "
        >
          {number}
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
};

export default GridGenerator;