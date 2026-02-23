import React, { useState } from 'react';
import { X } from 'lucide-react';

const ChipsInput = () => {
  const [inputValue, setInputValue] = useState('');
  
  const [chips, setChips] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      
    
      const newChip = {
        id: Date.now() + Math.random(), 
        text: inputValue.trim()
      };

      setChips([...chips, newChip]);
      setInputValue('');
    }
  };

  const removeChip = (idToRemove) => {
    setChips(chips.filter((chip) => chip.id !== idToRemove));
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <div className="w-full max-w-md ">
        
        
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type & hit enter"
          className="w-full px-4 py-2 bg-slate-50 border border-black  focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
        />

        
        <div className="flex flex-wrap gap-2 mt-5">
          {chips.map((chip) => (
            <div
              key={chip.id}
              className="flex items-center gap-1.5 bg-white text-gray-700 px-3 py-1 rounded-md border border-gray-400"
            >
              <span className="text-sm font-medium">{chip.text}</span>
              <button
                onClick={() => removeChip(chip.id)}
                className="text-red-500"
                title="Remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ChipsInput;