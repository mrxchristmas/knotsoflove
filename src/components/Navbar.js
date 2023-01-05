import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'
import '../css/Navbar.css'
import anon from '../assets/anonymous.jpg'

export default function Navbar() {
  const { logout } = useAuth()
  const { user } = useAuthContext()

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="nav-main bg-whitesmoke text-black flex-row-start-between p-1-2">
      <Link to="/" className='font-aureta brand-name'><h1 >Knots of Love</h1></Link>

      
      <div className="navs flex-row-center-center">
        <NavLink to="/products" className="m-0-1" >Products</NavLink>
        <NavLink to="/social" className="m-0-1">Social</NavLink>
        <NavLink to="/contact" className="m-0-1">Contact</NavLink>
        <NavLink to="/about" className="m-0-1">About</NavLink>
      </div>

      <div className='flex-row-start-start'>

        {!user && <div className='flex-row-center-center login-button'>
          <NavLink to="/login">Login | Register</NavLink>
        </div>}
        {/* {user && <li className='' onClick={() => logout()}>Logout</li>} */}

        {user && 
          <div className="profile-container flex-col-center-center position-relative">
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="profile-img-name-container flex-row-center-end">
              <span className="profile-name">{!user.isAnonymous ? user.displayName.replace(/ .*/,'') : "Guest"}</span>
              <img className="profile-photo ml-1" src={!user.isAnonymous ? user.photoURL : anon} alt="" />
            </div>
            {isProfileOpen && 
              <div className="profile-popup-container mt-1 p-1 flex-col-center-center">
                <span className=''>Hello {!user.isAnonymous ? user.displayName.replace(/ .*/,'') : "Guest"}!</span>
                <hr />
                {!user.isAnonymous && <button className="btn-pink">View Favorites</button> }
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

      

      

      
      
      