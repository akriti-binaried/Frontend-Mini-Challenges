import React, { useState, useEffect } from 'react';

const AdvancedCounter = () => {
  
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1); 
  const [step, setStep] = useState(1);
  const [lowerLimit, setLowerLimit] = useState(-1000);
  const [upperLimit, setUpperLimit] = useState(1000);
  const [isBlocking, setIsBlocking] = useState(false);

  
  const handleSyncChange = (type) => {
    setCount(prev => {
      const newValue = type === 'plus' ? prev + Number(step) : prev - Number(step);
      return Math.min(Math.max(newValue, lowerLimit), upperLimit);
    });
  };

  
  const handleAsyncChange = (type) => {
    setIsBlocking(true);
    
    setTimeout(() => {
      setCount(prev => {
        const newValue = type === 'plus' ? prev + Number(step) : prev - Number(step);
        return Math.min(Math.max(newValue, lowerLimit), upperLimit);
      });
      setIsBlocking(false);
    }, delay * 1000);
  };

  const resetAll = () => {
    setCount(0);
    setStep(1);
    setDelay(1);
    setLowerLimit(-1000);
    setUpperLimit(1000);
    setIsBlocking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 font-sans text-gray-800">
      
      
      <h1 className="text-5xl font-bold mb-8">{count}</h1>

      
      <div className="flex gap-4 mb-4">
        <button onClick={() => handleSyncChange('minus')} className="px-6 py-1 border border-gray-400 bg-gray-50 hover:bg-gray-100 shadow-sm">-</button>
        <button onClick={() => handleSyncChange('plus')} className="px-6 py-1 border border-gray-400 bg-gray-50 hover:bg-gray-100 shadow-sm">+</button>
      </div>

     
      <div className="flex gap-4 mb-6">
        <button 
          disabled={isBlocking}
          onClick={() => handleAsyncChange('minus')}
          className="px-4 py-1 border border-gray-400 bg-gray-50 hover:bg-gray-100 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          async -
        </button>
        <button 
          disabled={isBlocking}
          onClick={() => handleAsyncChange('plus')}
          className="px-4 py-1 border border-gray-400 bg-gray-50 hover:bg-gray-100 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          + async
        </button>
      </div>

     
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xl">Delay</span>
        <input 
          type="range" min="1" max="3" step="1" 
          value={delay} 
          onChange={(e) => setDelay(e.target.value)}
          className="w-24 cursor-pointer"
        />
        <span className="text-xl">{delay}s</span>
      </div>

     
      <div className="flex flex-col gap-4 items-end">
        <div className="flex items-center gap-3 text-xl">
          <label>Increment/Decrement by</label>
          <input type="number" value={step} onChange={(e) => setStep(e.target.value)} className="w-20 border border-gray-400 p-1 outline-none" />
        </div>

        <div className="flex items-center gap-3 text-xl">
          <label>Lower Limit</label>
          <input type="number" value={lowerLimit} onChange={(e) => setLowerLimit(e.target.value)} className="w-24 border border-gray-400 p-1 outline-none" />
        </div>

        <div className="flex items-center gap-3 text-xl">
          <label>Upper Limit</label>
          <input type="number" value={upperLimit} onChange={(e) => setUpperLimit(e.target.value)} className="w-24 border border-gray-400 p-1 outline-none" />
        </div>
      </div>

     
      <button 
        onClick={resetAll}
        className="mt-8 px-8 py-2 border border-gray-400 bg-gray-50 hover:bg-gray-100 text-xl shadow-sm"
      >
        Reset
      </button>

     
      {isBlocking && (
        <p className="mt-4 text-blue-600 font-medium animate-pulse">Processing async update...</p>
      )}
    </div>
  );
};

export default AdvancedCounter;