import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'
import anon from '../assets/anonymous.jpg'
import { useIsMobile } from '../hooks/useIsMobile'
import { useLocation } from 'react-router-dom' 

export default function Navbar({ openNav }) {
  const { logout } = useAuth()
  const { user, ADMIN_UID } = useAuthContext()
  const { isMobile } = useIsMobile()
  const location = useLocation()
  

  // const x = !user.isAnonymous ? user.photoURL : anon;
  // console.log(ADMIN_UID === user.uid);
  

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  

  return (
    <div className="nav-main  text-black flex-row-center-between p-1-2">

      {isMobile && location.pathname === '/gallery' && openNav}

      <Link to="/" className='font-aureta brand-name flex-row-end-start text-straight'><h1>Knots of Love</h1></Link>
      
        <div className={`${isMobile ? "navs-mobile" : "navs"} flex-row-center-center`}>
          <NavLink to="/gallery" className="m-0-1" >Gallery</NavLink>
          <NavLink to="/testimonials" className="m-0-1">Testimonials</NavLink>
          <NavLink to="/contact" className="m-0-1">Contact</NavLink>
          <NavLink to="/about" className="m-0-1">About</NavLink>
        </div>

      <div className='nav-profile flex-row-start-start'>

        {!user && <div className='flex-row-center-center login-button'>
          <NavLink to="/login">Login | Register</NavLink>
        </div>}

        {user && user.photoURL &&
          <div className="profile-container flex-col-end-center position-relative">
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-img-name-container flex-row-center-end">
              {!isMobile && <span className="profile-name">{!user.isAnonymous ? user.displayName.replace(/ .*/,'') : "Guest"}</span>}
              <img className="profile-photo ml-1" src={!user.isAnonymous ? user.photoURL : anon} alt="" />
            </div>
            {isProfileOpen && 
              <div className="profile-popup-container mt-1 p-1 flex-col-center-center">
                <span className=''>Hello {!user.isAnonymous ? user.displayName.replace(/ .*/,'') : "Guest"}!</span>
                <hr />
                {ADMIN_UID === user.uid && <Link to="/manage" className="btn-black text-white ">Manage Website</Link> }
                {!user.isAnonymous && <button className="btn-pink mt-1">View Favorites</button> }
                {user.isAnonymous && <p>You will lose all data when you logout</p> }
                {user.isAnonymous && <button className="btn-green">Link Guest Account</button> }
                <button className="btn-red mt-1" onClick={() => logout()}>Logout</button>
              </div>
            }
            
          </div>
        }

      </div>

      

    </div>
  )
}

      

      

      
      
