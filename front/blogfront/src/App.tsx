import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'


import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
