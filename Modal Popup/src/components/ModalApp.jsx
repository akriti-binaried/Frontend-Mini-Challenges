import React, { useState, useEffect } from 'react';

const ModalApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const [settings, setSettings] = useState({
    closeDialogOnOutsideClick: true,
    closeDialogOnEscape: true,
    showCloseIcon: true,
    showBackdrop: true,
  });

  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (settings.closeDialogOnEscape && e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, settings.closeDialogOnEscape]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 space-y-6 font-sans mt-1">
      
      
      <div className="flex flex-col items-end space-y-4 text-lg ">
        {Object.entries(settings).map(([key, value]) => (
          <label key={key} className="flex items-center space-x-3 cursor-pointer">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <input
              type="checkbox"
              name={key}
              checked={value}
              onChange={handleCheckboxChange}
              className="w-5 h-5 accent-blue-600"
            />
          </label>
        ))}
      </div>

      <div className= 'ml-30'>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 border border-gray-400 bg-gray-100 hover:bg-gray-200 text-sm"
      >
        Open Modal
      </button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          
          {settings.showBackdrop && (
            <div 
              className="absolute inset-0 bg-black/40" 
              onClick={() => settings.closeDialogOnOutsideClick && setIsOpen(false)}
            />
          )}

          
          <div className="relative bg-white w-full max-w-2xl shadow-2xl border border-gray-300 p-8 animate-in fade-in zoom-in duration-200">
            
           
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">Modal Heading</h2>
              {settings.showCloseIcon && (
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 border border-gray-200 hover:bg-gray-50 text-2xl leading-none"
                >
                  &times;
                </button>
              )}
            </div>

            
            <p className="text-sm text-black mb-10 leading-relaxed">
              This is modal content. You can put any content here.This has a groovy backdrop!You can also close this modal by clicking outside of it or pressing the escape key 
            </p>

           
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-400 bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalApp;