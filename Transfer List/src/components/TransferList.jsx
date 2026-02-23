import React, { useState } from 'react';

const TransferList = () => {
  
  const [leftItems, setLeftItems] = useState([
    { id: 1, name: 'USA', checked: false },
    { id: 2, name: 'UAE', checked: false },
    { id: 3, name: 'India', checked: false },
    { id: 4, name: 'Australia', checked: false },
    { id: 5, name: 'Canada', checked: false },
  ]);

  const [rightItems, setRightItems] = useState([]);

  
  const handleToggle = (id, side) => {
    if (side === 'left') {
      setLeftItems(leftItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    } else {
      setRightItems(rightItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      ));
    }
  };

  
  const moveAllRight = () => {
    setRightItems([...rightItems, ...leftItems.map(i => ({ ...i, checked: false }))]);
    setLeftItems([]);
  };

 
  const moveSelectedRight = () => {
    const selected = leftItems.filter(item => item.checked).map(i => ({ ...i, checked: false }));
    const remaining = leftItems.filter(item => !item.checked);
    setRightItems([...rightItems, ...selected]);
    setLeftItems(remaining);
  };

  
  const moveSelectedLeft = () => {
    const selected = rightItems.filter(item => item.checked).map(i => ({ ...i, checked: false }));
    const remaining = rightItems.filter(item => !item.checked);
    setLeftItems([...leftItems, ...selected]);
    setRightItems(remaining);
  };

  
  const moveAllLeft = () => {
    setLeftItems([...leftItems, ...rightItems.map(i => ({ ...i, checked: false }))]);
    setRightItems([]);
  };

  
  const anyLeftChecked = leftItems.some(i => i.checked);
  const anyRightChecked = rightItems.some(i => i.checked);

  return (
    <div className="flex items-center justify-center gap-6 p-10">
      
      
      <div className="w-64 h-80 border-2 border-black bg-white overflow-y-auto p-4 ">
        {leftItems.map(item => (
          <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={() => handleToggle(item.id, 'left')}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-black">{item.name}</span>
          </label>
        ))}
      </div>

      
      <div className="flex flex-col gap-3">
        <button 
          onClick={moveAllRight}
          disabled={leftItems.length === 0}
          className="px-4 py-2 bg-white border border-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
        >
          &gt;&gt;
        </button>
        
        <button 
          onClick={moveSelectedRight}
          disabled={!anyLeftChecked}
          className="px-4 py-2 bg-white border border-black  hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
        >
          &gt;
        </button>

        <button 
          onClick={moveSelectedLeft}
          disabled={!anyRightChecked}
          className="px-4 py-2 bg-white border border-black hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
        >
          &lt;
        </button>

        <button 
          onClick={moveAllLeft}
          disabled={rightItems.length === 0}
          className="px-4 py-2 bg-white border border-black  hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 font-bold"
        >
          &lt;&lt;
        </button>
      </div>

      
      <div className="w-64 h-80 border-2 border-black bg-white  overflow-y-auto p-4 ">
        {rightItems.map(item => (
          <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-green-50 cursor-pointer rounded">
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={() => handleToggle(item.id, 'right')}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-black">{item.name}</span>
          </label>
        ))}
      </div>

    </div>
  );
};

export default TransferList;