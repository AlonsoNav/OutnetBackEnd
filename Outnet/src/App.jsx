import { useState } from 'react'
import './App.css'
import MainPage from './components/MainPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Products from './components/Products';
import ProductView from './components/ProductView';
import Cart from './components/Cart';
import Payment from './components/Payment';


function App() {

  return (
    <>
      <Header></Header>
      <Payment></Payment>
    </>
  )
}

export default App
