import React, { useState } from 'react';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');


  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  
  const getStrength = () => {
    const strengthCount = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;
    if (password.length === 0) return { label: 'Weak', color: 'bg-transparent', width: 'w-0' };
    if (password.length < 6 || strengthCount <= 1) return { label: 'Weak', color: 'bg-red-500', width: 'w-1/3' };
    if (password.length < 10 || strengthCount <= 3) return { label: 'Medium', color: 'bg-yellow-500', width: 'w-2/3' };
    return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
  };

  const strength = getStrength();

  return (
    <div className="flex flex-col items-center justify-center p-10 font-sans">
      <div className="w-full max-w-sm space-y-4">
       
        <input
          type="text"
          placeholder="Enter the password"
          className="w-full p-2 border outline-none text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between text-gray-400 font-medium ">
          <span className={hasLowercase ? "text-green-500" : ""}>Lowercase</span>
          <span className={hasUppercase ? "text-green-500" : ""}>Uppercase</span>
          <span className={hasNumber ? "text-green-500" : ""}>Number</span>
          <span className={hasSymbol ? "text-green-500" : ""}>Symbols</span>
        </div>

        
        <div className="w-full h-4 border border-gray-300 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${strength.color} ${strength.width}`}
          ></div>
        </div>

        <div className="text-center space-y-2 text-xl text-gray-800">
          <p>Password has <span className="font-bold">{password.length}</span> chars</p>
          <p>Your password is <span className="font-bold">{strength.label}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
