import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import PostView from './pages/PostView.tsx'
import Layout from './components/Layout'
import { createContext, useContext, useState, useEffect } from 'react';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const App = () => {

  const token = localStorage.getItem('data');
  if (token) {
    console.log("test")
    console.log(token)
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path="/PostView/:id" element={<PostView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
