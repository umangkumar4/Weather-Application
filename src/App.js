import React from 'react'
import Component from './Component'
import GoogleSignUpPage from './GoogleSignUpPage'
import {Routes,Route } from 'react-router-dom'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<GoogleSignUpPage />} ></Route>
      <Route path='/data' element={<Component />} ></Route>
    </Routes>
  </>
  )
}

export default App

