import React, { useState } from 'react'

const Rating = () => {
    const [rating, setRating] = useState()
    const [hover, setHover ] = useState(0)
    let arr = new Array(5).fill(0);
    
  return (
    <div className='container'>
        {
            arr.map(( urValue, index)=>{
                return(
                    <span 
                    className={hover == 0 &&index<rating || index<hover ?"colored":"uncolored"}
                    onClick={()=>setRating(index+1)}
                    onMouseEnter={()=>setHover(index+1)}
                    onMouseLeave={()=>setHover(0)}
                    key={index}>&#9733;
</span>
                )
            })
        }
     
    </div>
  )
}

export default Rating
