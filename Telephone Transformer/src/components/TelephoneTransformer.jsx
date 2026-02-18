import React, { useState } from 'react';

const TelephoneTransformer = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleInputChange = (e) => {
    const input = e.target.value;
    
    
    const digits = input.replace(/\D/g, '');
    
   
    let formattedValue = '';

    if (digits.length > 0) {
      formattedValue += '+(' + digits.slice(0, 3);
    }
    if (digits.length >= 4) {
      formattedValue += ') - ' + digits.slice(3, 10);
    } else if (digits.length > 0) {
      
    }

    setPhoneNumber(formattedValue);
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-sm">
        
        <div className="relative">
          <input
            type="text"
            placeholder="Mobile number"
            value={phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 text-2xl border-2 border-black rounded-sm outline-none focus:ring-2 focus:ring-sky-300 transition-colors text-gray-700 font-medium"
          />
        </div>
        <div className='flex justify-center items-center'>        
        <p>+(123) - 4567890</p>
      </div>
    </div>
    </div>
  );
};

export default TelephoneTransformer;