import React from 'react'

function Preloader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center text-5xl ">
    
        <img 
          src="https://media.baamboozle.com/uploads/images/477512/48fad95c-4682-4274-a549-b663c1d60f7e.gif" 
          className="mx-auto w-150 h-150" 
        />
       
      </div>
    </div>
  )
}

export default Preloader