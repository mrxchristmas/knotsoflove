import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import './app.css'

// components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Social from './pages/Social'
import Products from './pages/products/Products'


function App() {

  const { user, authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login/" element={ !user ? <Login /> : <Navigate to="/" /> } />
            <Route path="/about/" element={ <About /> } />
            <Route path="/contact/" element={ <Contact /> } />
            <Route path="/social/" element={ <Social /> } />
            <Route path="/products/" element={ <Products /> } />
            <Route path="*" element={ <Navigate to="/" />  } />
          </Routes>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App
