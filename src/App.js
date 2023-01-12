import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


import './app.css'

// components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import { Gallery } from './pages/Gallery'
import Item from './pages/Item'
import Manage from './pages/Manage'
import ManageCategory from './components/ManageCategory'
import ManageColors from './components/ManageColors'
import ManageItem from './components/ManageItem'


import { useState } from 'react'


function App() {
  const { user, authIsReady, ADMIN_UID } = useAuthContext()

  const [nav, setNav] = useState(false)
  const NavButtonOpen = <img onClick={() => setNav(true)} src="icons/menu_black_48dp.svg" alt="" />
  const NavButtonClose = <img onClick={() => setNav(false)} src="icons/close_black_48dp.svg"  alt=""/>

  
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar openNav={NavButtonOpen} />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login/" element={ !user ? <Login /> : <Navigate to="/" /> } />
            <Route path="/manage/" element={ user && user.uid === ADMIN_UID ? <Manage /> : <Navigate to="/" /> } >
              <Route path="/manage/category/" element={ <ManageCategory /> } />
              <Route path="/manage/colors/" element={ <ManageColors /> } />
              <Route path="/manage/item/" element={ <ManageItem /> } />
            </Route>
            <Route path="/about/" element={ <About /> } />
            <Route path="/contact/" element={ <Contact /> } />
            <Route path="/testimonials/" element={ <Testimonials /> } />
            <Route path="/item/" element={ <Item /> } />
            <Route path="/gallery/" element={ <Gallery nav={nav} setNav={setNav} closeNav={NavButtonClose} /> } />
            <Route path="*" element={ <Navigate to="/" />  } />
          </Routes>
        </BrowserRouter>
      )}

    </div>
  );
}

export default App
