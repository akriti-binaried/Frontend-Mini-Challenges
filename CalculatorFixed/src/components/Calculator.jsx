import React, { useState } from "react";

const Calculator = () => {

  const [input, setInput] = useState("");

  // number click
  const handleNumber = (num) => {
    setInput(input + num);
  };

  // operator click
  const handleOperator = (op) => {
    setInput(input + op);
  };

  // clear
  const handleClear = () => {
    setInput("");
  };

  // delete last character
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  // calculate result
  const handleEqual = () => {
    try {
      const result = eval(input);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  // square
  const handleSquare = () => {
    try {
      setInput((eval(input) ** 2).toString());
    } catch {
      setInput("Error");
    }
  };

  // sqrt
  const handleSqrt = () => {
    try {
      setInput(Math.sqrt(eval(input)).toString());
    } catch {
      setInput("Error");
    }
  };

  // power
  const handlePower = () => {
    setInput(input + "**");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">

      <div className="bg-green-200 p-6 rounded-3xl w-[350px]">

        {/* Display */}
        <div className="bg-black text-white h-[70px] rounded-xl flex items-center justify-end px-4 text-2xl mb-5">
          {input || "0"}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-4">

          <button onClick={handleClear} className="btn-orange">Clear</button>
          <button onClick={handleDelete} className="btn-orange">Del</button>
          <button onClick={() => handleOperator("-")} className="btn-orange">+-</button>
          <button onClick={handleSquare} className="btn-orange">x²</button>

          <button onClick={() => handleNumber("1")} className="btn-green">1</button>
          <button onClick={() => handleNumber("2")} className="btn-green">2</button>
          <button onClick={() => handleNumber("3")} className="btn-green">3</button>
          <button onClick={() => handleOperator("+")} className="btn-orange">+</button>

          <button onClick={() => handleNumber("4")} className="btn-green">4</button>
          <button onClick={() => handleNumber("5")} className="btn-green">5</button>
          <button onClick={() => handleNumber("6")} className="btn-green">6</button>
          <button onClick={() => handleOperator("/")} className="btn-orange">÷</button>

          <button onClick={() => handleNumber("7")} className="btn-green">7</button>
          <button onClick={() => handleNumber("8")} className="btn-green">8</button>
          <button onClick={() => handleNumber("9")} className="btn-green">9</button>
          <button onClick={() => handleOperator("*")} className="btn-orange">*</button>

          <button onClick={() => handleNumber("0")} className="btn-green">0</button>
          <button onClick={handlePower} className="btn-orange">xʸ</button>
          <button onClick={handleSqrt} className="btn-orange">√</button>
          <button onClick={() => handleOperator("-")} className="btn-orange">−</button>

          <button onClick={() => handleNumber(".")} className="btn-green">.</button>
          <button onClick={handleEqual} className="btn-orange col-span-1">=</button>

        </div>

      </div>

      {/* styles */}
      <style>
        {`
          .btn-green {
            background-color: #4f6f6f;
            color: white;
            height: 60px;
            border-radius: 16px;
            font-size: 20px;
          }

          .btn-orange {
            background-color: #e7663c;
            color: white;
            height: 60px;
            border-radius: 16px;
            font-size: 20px;
          }
        `}
      </style>

    </div>
  );
};

export default Calculator;
