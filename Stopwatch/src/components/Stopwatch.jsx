import React, { useState, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState("idle"); 
  const timerRef = useRef(null);

  const startTimer = () => {
    if (status !== "running") {
      setStatus("running");
      timerRef.current = setInterval(() => setTime(t => t + 10), 10);
    }
  };

  const pauseTimer = () => {
    if (status === "running") {
      clearInterval(timerRef.current);
      setStatus("paused");
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setStatus("idle");
    setTime(0);
  };

  const formatTime = () => {
    const min = ("0" + Math.floor((time / 60000) % 60)).slice(-2);
    const sec = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
    const ms = ("0" + ((time / 10) % 100)).slice(-3);
    return `${min}:${sec}:${ms}`;
  };

  
  const renderBtn = (label, onClick, isActive) => {
    return (
      <button
        onClick={onClick}
        disabled={isActive}
        className={`
          flex-1 px-4 py-3 rounded-xl font-bold text-white uppercase text-xs md:text-sm
          transition-all duration-300 shadow-lg
          bg-gradient-to-b from-blue-400 to-purple-600
          ${isActive 
            ? "opacity-30 cursor-not-allowed" 
            : "opacity-100 hover:scale-105 active:scale-95 hover:shadow-indigo-500/50 cursor-pointer"
          }
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center  bg-gray-50 p-4">
     
      <div className="w-80 h-80 md:w-96 md:h-96 bg-gray-200 border-2 border-gray-400 rounded-full 
                      flex flex-col items-center justify-center">
        
        <h1 className="text-3xl md:text-4xl font-black text-purple-900 mb-2 tracking-tighter">
          Stopwatch
        </h1>
        
        <div className="text-4xl md:text-5xl font-mono font-bold text-red-800 mb-8 drop-shadow-sm">
          {formatTime()}
        </div>

       
        <div className="flex gap-2 w-full px-8">
          {renderBtn("Start", startTimer, status === "running")}
          {renderBtn("Pause", pauseTimer, status === "paused")}
          {renderBtn("Reset", resetTimer, status === "idle" && time === 0)}
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;