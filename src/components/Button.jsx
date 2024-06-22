import React from 'react'

export default function Button({
    children,
    type= "button",
    bgColor = 'bg-blue-600',
    textColor ='text-white',
    className ='',
    ...props
}) {
  return (
    <button className= {`my-12 mr-2 px-4 py-1 text-base rounded-lg ${bgColor} ${textColor}`} {...props}>
        {children}
    </button>
  )
}


