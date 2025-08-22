import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import OrderForm from './components/OrderForm'
import FoodSelection from './components/FoodSelection'

function App() {
  return (
    <>
      <Navbar />
      <OrderForm/>
      {/* <FoodSelection/> */}
    </>
  )
}

export default App
