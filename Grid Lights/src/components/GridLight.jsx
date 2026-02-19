import React, { useState, useMemo } from 'react';

const GridLight = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [gridSize, setGridSize] = useState(4); 
  const [delay, setDelay] = useState(700);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Grid config jo gridSize ke hisaab se boxes banata hai
  const config = useMemo(() => {
    // Ab koi bhi box khali nahi rahega, saare '1' honge
    return Array(gridSize * gridSize).fill(1);
  }, [gridSize]);
  
  const activateBox = (index) => {
    if (isDeactivating || order.includes(index)) return;
    const newOrder = [...order, index];
    setOrder(newOrder);

    // Jab saare boxes select ho jayein
    if (newOrder.length === config.length) {
      deactivateBoxes(newOrder);
    }
  };

  const deactivateBoxes = (currentOrder) => {
    setIsDeactivating(true);
    let tempOrder = [...currentOrder];
    const timer = setInterval(() => {
      tempOrder.pop();
      setOrder([...tempOrder]);
      if (tempOrder.length === 0) {
        clearInterval(timer);
        setIsDeactivating(false);
      }
    }, delay);
  };

  const sliderTrackStyle = (value, min, max) => {
    const percentage = ((value - min) * 100) / (max - min);
    return {
      background: `linear-gradient(to right, #3b82f6 ${percentage}%, #374151 ${percentage}%)`
    };
  };

  return (
    <div>
      <div className="w-full mb-6">
  <p className="text-center text-gray-600 font-medium leading-relaxed">
    Click on cells to select them. Once all cells are selected, they will be 
    unselected one by one in the reverse order they were selected.
  </p>
</div>
    <div className="relative min-h-screen bg-white flex items-center justify-center p-6">
      
      {/* --- Floating Config Panel --- */}
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end">
        <div className="bg-[#1a1c23] text-white rounded-lg shadow-2xl min-w-[280px] border border-gray-700">
          <div 
            className="flex items-center p-4 cursor-pointer hover:bg-[#242731] transition-all rounded-t-lg"
            onClick={() => setIsConfigOpen(!isConfigOpen)}
          >
            <span className="mr-6">
              {isConfigOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              )}
            </span>
            <span className="text-md font-semibold text-gray-200 tracking-tight">Config</span>
          </div>

          {isConfigOpen && (
            <div className="p-5 space-y-6 bg-[#111217] border-t border-gray-800 rounded-b-lg">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-gray-400">gridSize</span>
                <input 
                  type="range" min="2" max="4" value={gridSize} 
                  onChange={(e) => { setGridSize(parseInt(e.target.value)); setOrder([]); }}
                  className="flex-1 h-1 rounded-lg appearance-none cursor-pointer"
                  style={sliderTrackStyle(gridSize, 2, 4)}
                />
                <span className="bg-[#1a1c23] px-3 py-1 rounded text-xs min-w-[35px] text-center border border-gray-700">{gridSize}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-gray-400">delay</span>
                <input 
                  type="range" min="100" max="700" step="100" value={delay} 
                  onChange={(e) => setDelay(parseInt(e.target.value))}
                  className="flex-1 h-1 rounded-lg appearance-none cursor-pointer"
                  style={sliderTrackStyle(delay, 100, 700)}
                />
                <span className="bg-[#1a1c23] px-3 py-1 rounded text-xs min-w-[45px] text-center border border-gray-700">{delay}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Main Grid Area: Size adjust according to gridSize --- */}
      <div 
        className="grid gap-4 w-full max-w-[600px] transition-all duration-300"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, 1fr)` 
        }}
      >
        {config.map((_, index) => {
          const isSelected = order.includes(index);
          
          return (
           <button
              key={index}
              disabled={isSelected || isDeactivating}
              onClick={() => activateBox(index)}
              className={`aspect-square w-full border-2 border-black transition-all duration-150
                ${isSelected 
                  ? 'bg-green-500 border-green-600 scale-95 shadow-md' 
                  : isDeactivating 
                  ? 'bg-transparent cursor-not-allowed opacity-50' 
                  : 'bg-transparent hover:bg-gray-100 cursor-pointer'
                }`}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default GridLight;