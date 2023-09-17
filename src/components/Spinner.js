import React from 'react'
import loading from './Loading.gif'

const spinner=()=> {
    return (
      <div className='text-center'>
        <img className='my-3' src={loading} alt="loading" style={{height:'50px',width:'50px'}} />
      </div>
    )
}

export default spinner
