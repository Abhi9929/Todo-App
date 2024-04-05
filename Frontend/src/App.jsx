import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TodoPage from './pages/TodoPage'
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route  path='/' element={<Navigate to={'/signin'} />} />
            <Route  path='/signin' element={<SignIn />} />
            <Route  path='/signup' element={<SignUp />} />
            <Route path='/main' element={<TodoPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App