import React from 'react'
import trans_logo from '../assets/trans_logo.png'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={trans_logo} alt="logo" className='w-20 h-20' />
    </div>
  )
}

export default Logo