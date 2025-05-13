import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import PostView from './pages/PostView.tsx'
import CreatePost from './pages/CreatePost.tsx'
import Layout from './components/Layout'
import { AuthProvider } from './contexts/AuthContext';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path="/PostView/:id" element={<PostView />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
