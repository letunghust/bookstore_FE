import React from 'react'

const Button = ({type, label}) => {
  return (
    <div>
        <button type={type} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
          {label}
        </button>
    </div>
  )
}

export default Button