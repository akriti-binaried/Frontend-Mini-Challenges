import React, { useState } from 'react'

const Counter = () => {

    const [counter, setCounter] = useState(0);
    const [step, setStep] = useState(1);

    const increaseBtn=(value)=>{
        setCounter(prev => prev + Number(value));
    }

    const decreaseBtn=(value)=>{
        setCounter(prev => prev - Number(value))
    }

    const resetBtn=()=>{
        setCounter(0)
    }



  return (
    <>
    <div className='flex flex-col justify-center items-center mt-8'>
      <div className='text-3xl font-bold'>
        {counter}
      </div>

      <div className='flex space-x-2 mt-4'>
        <button className='border border-gray-400 rounded-sm  h-9 w-7 bg-gray-100 hover:bg-gray-200' onClick={()=>decreaseBtn(step)}>
            -
        </button>

        <button className='border border-gray-400 rounded-sm  h-9 w-7 bg-gray-100 hover:bg-gray-200' onClick={()=>increaseBtn(step)}>
            +
        </button>
      </div>

        <div className='flex m-5'>
            <h3>Increment/Decrement by </h3> 
            <span className='mx-3'>
                <input type="number"
                value={step} className='border w-20 p-1 focus:outline-none focus:ring-2 focus:ring-blue-300' onChange={(e)=>setStep(e.target.value)}/>
                </span>
        </div>
        <div>
            <button className='border w-17 h-10 font-semibold bg-gray-100 ' >Reset</button>
        </div>
        </div>
    </>
  )
}

export default Counter
