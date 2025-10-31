
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Mobiles from './pages/Mobiles'
import Reviews from './pages/Reviews'
import Wishlist from './pages/Wishlist'
import PagenotFound from './pages/PagenotFound'
import Preloader from './components/Preloader'
import { useEffect, useState } from 'react'

function App() {
    const [isLoading,setIsLoading]=useState(false)
 useEffect(()=>{
  setTimeout(()=>{
   setIsLoading(true)
  },4000)
 })
  return (
    <Routes>

         <Route path='' element={isLoading?<Home />:<Preloader/> }/>
      <Route path='mobiles' element={<Mobiles />} />
      <Route path='reviews' element={<Reviews />} />
      <Route path='wishlist' element={<Wishlist />} />
      <Route path='*' element={<PagenotFound />} />
    </Routes>
  )
}

export default App
