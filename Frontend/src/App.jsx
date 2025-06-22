import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

const App = () => {
 
 


  const router=createBrowserRouter([
    {
      path:"/",
      element:<>
      <Navbar/>
    <Landing/>
      <Footer/>
      </>
    },{
      path:"/login",
      element:<>
      <Login/>
      </>
    },
    {

 path:"/signup",
 element:<>
<Signup/>
 </>

    },
   
   
   
    {
      path:'/home',
      element:<>
      <Navbar/>
      <Home/>
      <Footer/>
      </>
    }
  
    
  ])
  return (
  <>
 <RouterProvider router={router} />
  
  </>
  )
}

export default App
