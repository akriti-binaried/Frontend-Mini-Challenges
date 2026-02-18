import React, { useState } from 'react'

const StringTransformers = () => {
    const [text,setText] = useState();
    const [result,setResult] = useState();

    const upperCaseBtn=()=>{
        setResult(text.toUpperCase())
    }

    const lowerCaseBtn=()=>{
        setResult(text.toLowerCase())
    }

    const camelCaseBtn=(str)=>{
        let words = text.split(" ");
         let res = words[0].toLowerCase();

    for (let i = 1; i < words.length; i++)
    res += words[i][0].toUpperCase() + words[i].slice(1).toLowerCase();

  setResult(res);
    }

    const pascalCaseBtn=()=>{
             let words = text.split(" ");
             let res = "";

  for (let word of words)
    res += word[0].toUpperCase() + word.slice(1).toLowerCase();

  setResult(res);
    }

    const snakecaseBtn=()=>{
                setResult(text.toLowerCase().split(" ").join("_"));

    }

    const kebabCaseBtn=()=>{
        setResult(text.toLowerCase().split(" ").join("-"));
    }

    const trimBtn=()=>{
        setResult(text.trim());

    }
  return (
    <>
      <div className='flex flex-col justify-center items-center'>

        <textarea name="" placeholder='Enter a sentence...' className='w-[500px] h-[100px] border mt-10 focus:ring-2 focus:ring-blue-400 '
        value={text}
        onChange={(e)=>setText(e.target.value)}
        ></textarea>

        <div>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5 mr-4' onClick={lowerCaseBtn}>Lower Case</button>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5 mr-4'onClick={upperCaseBtn}>Upper Case</button>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5' onClick={camelCaseBtn}>Camel Case</button>

        </div>

        <div>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5 mr-4'
            onClick={pascalCaseBtn}
            >Pascal Case</button>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5 mr-4' onClick={snakecaseBtn}>Snake Case</button>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5' onClick={kebabCaseBtn}>Kebab Case</button>

        </div>

        <div>
            <button className='h-10 w-40  border rounded bg-gray-100 border-gray-400 hover:bg-gray-200 mt-5 mr-4' onClick={trimBtn}>Trim</button>

        </div>

        <div>
            <h3 className='mt-5 font-bold text-xl'>Transformed String:</h3>
            <p className='mt-10'>{result}</p>
        </div>

      </div>
    </>
  )
}

export default StringTransformers
