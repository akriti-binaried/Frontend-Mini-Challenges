import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastGenerator = () => {
  const [horizontal, setHorizontal] = useState("right");
  const [vertical, setVertical] = useState("top");
  const [type, setType] = useState("success");
  const [message, setMessage] = useState("Project updated successfully!");
  const [duration, setDuration] = useState(3000);

  const showToast = () => {
    if (!message.trim()) return;

   
    const positionStr = `${vertical}-${horizontal}`;

   
    const options = {
      position: positionStr,
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light", 
    };

    
    if (type === "success") {
      toast.success(message, options);
    } else if (type === "error") {
      toast.error(message, options);
    } else if (type === "warning") {
      toast.warning(message, options);
    } else if (type === "info") {
      toast.info(message, options);
    } else {
      toast(message, options);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      
      
      <ToastContainer />

        <div className=" w-1/3 space-y-2">
       
          <div>
            <select className="w-full p-2 border" 
              value={horizontal} onChange={(e) => setHorizontal(e.target.value)}>
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>
          <div>
            <select className="w-full p-2 border" 
              value={vertical} onChange={(e) => setVertical(e.target.value)}>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
            </select>
        </div>

        
        <div>
          <select className="w-full p-2 border" 
            value={type} onChange={(e) => setType(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>

       
        
      
          <input
            type="text"
            className="w-full p-2 border"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

        
        <div className="flex justify-center">
          <input
            type="range"
            min="1000"
            max="10000"
            step="1000"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-1/2 "
          />
        </div>

        
        <div className="flex justify-center">
        <button
          onClick={showToast}
          className="w-1/2 flex justify-center bg-blue-600  text-white py-2 rounded "
        >
          Show Toast
        </button>
        </div>
      </div>
      </div>
  );
};

export default ToastGenerator;