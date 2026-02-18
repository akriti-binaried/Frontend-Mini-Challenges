import React, { useEffect, useState } from 'react'

const GuessNumber = () => {
    const[state,setState] = useState(1)
    const[guess,setGuess] = useState("");
    const [message, setMessage] =useState("")

    useEffect(()=>{
        const num = Math.floor(Math.random()*10)+1;
        setState(num);
    },[])

    const checkGuess=()=>{


        if(Number(guess) === state){
            setMessage("Your guess number is correct according to actual number");
        } else if(Number(guess)>state){
            setMessage("Your guess is greater than the actual number")
        } else if (Number(guess)<state){
            setMessage("Your guess is less than the actual number")
        } 
    }
    
    const resetBtn = () => {

    const num = Math.floor(Math.random() * 10) + 1;

    setState(num);   
    setGuess("");   
    setMessage("");  
}

    
    
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <p className='mt-5 text-xl align-left'>Guess a Number between 0 and 100</p>

        <div>
            <input type="number" className='border w-100 p-1 mt-2 ' 
            value={guess}
            onChange={(e)=>setGuess(e.target.value)}
            />
        </div>

        <div className='mt-4 flex'>
            <button className='text-xl w-28 h-10 bg-gray-100'
            onClick={resetBtn}
            >Reset</button>

            <button className='text-xl w-28 h-10 bg-gray-100 ml-10'
            onClick={checkGuess}
            >Check</button>
        </div>

        <div className='text-xl'>
            {message}
        </div>

      </div>
    </>
  )
}

export default GuessNumber
