import React from 'react'

const Header = () => {
  return (
    <header className="bg-blue-100 text-blue-500 p-4 flex items-center justify-between border-solid border-2 border-b-blue-500 ">
     
      <div>
        <p className="text-lg font-light text-gray-800">Bienvenido,tu paciente es: <span className='text-blue-600'>Fernando Bárcenas</span></p>
      </div>

      
      <div className="flex items-center">
        <img
          src="/Fernando.png"
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  )
}

export default Header