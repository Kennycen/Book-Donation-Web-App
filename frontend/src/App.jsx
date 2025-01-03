import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Inventory from './pages/Inventory'
import Donate from './pages/Donate'
import { AppProvider } from './context/AppContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <AppProvider>
      <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/inventory' element={<Inventory/>}/>
            <Route path='/donate' element={<Donate/>}/>
            <Route path='/product/:productId' element={<Product/>}/>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </AppProvider>
  )
}

export default App