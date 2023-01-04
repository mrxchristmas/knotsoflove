import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'


function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={ user ? <Home /> : <Navigate to="/login" /> } />
            <Route path="/signup" element={ !user ? <Signup /> : <Navigate to="/" /> } />
            <Route path="/login/" element={ !user ? <Login /> : <Navigate to="/" /> } />
            <Route path="/about/" element={ <About /> } />
            <Route path="*" element={ <Navigate to="/" />  } />
          </Routes>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App
