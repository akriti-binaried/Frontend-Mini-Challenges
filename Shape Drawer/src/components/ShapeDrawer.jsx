import React, { useState, useRef, useEffect, useCallback } from 'react';

const ShapeDrawer = () => {
  const canvasRef = useRef(null);
  const [shape, setShape] = useState('circle'); 
  const [color, setColor] = useState('#3b82f6');
  const [size, setSize] = useState(50);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);

  
  const undo = useCallback(() => {
    if (history.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentState = canvas.toDataURL();
    
    setRedoList(prev => [currentState, ...prev]);
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    const img = new Image();
    img.src = previousState || "";
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (previousState) ctx.drawImage(img, 0, 0);
    };
    if (!previousState) ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [history]);

  
  const redo = useCallback(() => {
    if (redoList.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const nextState = redoList[0];
    
    setHistory(prev => [...prev, canvas.toDataURL()]);
    setRedoList(prev => prev.slice(1));

    const img = new Image();
    img.src = nextState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }, [redoList]);

 
  useEffect(() => {
    const handleKeyDown = (event) => {
     
      if (event.ctrlKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        undo();
      }
     
      if (event.ctrlKey && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const saveState = () => {
    const canvas = canvasRef.current;
    setHistory([...history, canvas.toDataURL()]);
    setRedoList([]); 
  };

  const drawShape = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    saveState();
    ctx.fillStyle = color;
    ctx.beginPath();
    if (shape === 'circle') {
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    } else {
      ctx.rect(x - size / 2, y - size / 2, size, size);
    }
    ctx.fill();
  };

  const getBtnClass = (isActive, isClear = false) => {
    if (isClear) return "bg-[#3b82f6] hover:bg-[#216ce6] text-white px-4 py-2 rounded-lg font-bold transition-all active:scale-95";
    return `px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2
      ${isActive 
        ? "bg-[#3b82f6] text-white cursor-pointer hover:bg-[#216ce6] active:scale-95" 
        : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
      }`;
  };

  return (
    <div className="min-h-screen p-8 flex flex-col items-center font-sans">
      <div className="bg-white p-6 w-full max-w-5xl">
        
       
        <div className="flex flex-wrap gap-8 items-center justify-center mb-6 pb-6 border-b">
          <div className="flex gap-2">
            <button onClick={() => {
              const ctx = canvasRef.current.getContext('2d');
              saveState();
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }} className={getBtnClass(true, true)}>Clear</button>
            <button onClick={undo} disabled={history.length === 0} className={getBtnClass(history.length > 0)}>Undo</button>
            <button onClick={redo} disabled={redoList.length === 0} className={getBtnClass(redoList.length > 0)}>Redo</button>
          </div>

          <select value={shape} onChange={(e) => setShape(e.target.value)} className="p-2 border  font-bold outline-none">
            <option value="circle">Circle</option>
            <option value="square">Square</option>
          </select>

          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 cursor-pointer" />
          <input type="range" min="10" max="60" value={size} onChange={(e) => setSize(e.target.value)} className="cursor-pointer accent-blue-600" />
        </div>

        
        <div className="relative w-full rounded-lg border-2 border-gray-200 bg-white overflow-hidden">
          {history.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-gray-400 text-xl italic font-medium">Click anywhere is this area to add a circle.<br></br>Use Ctrl+Z to undo and ctrl+Y to redo </span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={1000}
            height={500}
            onClick={drawShape}
            className="w-full h-auto cursor-crosshair"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeDrawer;