import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { logout } = useAuth()
  const { user } = useAuthContext()


  return (
    <nav className="w100 bg-purple flex-row-center-between p-1-2">
      <h1 className='text-white'>My Reading List</h1>
      <ul className='flex-row-center-center'>
        {user && <li className='ml-1 text-white'><Link to="/">Home</Link></li>}
        {!user && <li className='ml-1 text-white'><Link to="/login">Login</Link></li>}
        {!user && <li className='ml-1 text-white'><Link to="/signup">Signup</Link></li>}
        <li className='ml-1 text-white'><Link to="/about">About</Link></li>
        {user && <li className='ml-1 text-white' onClick={() => logout()}>Logout</li>}
        
      </ul>
    </nav>
  )
}
