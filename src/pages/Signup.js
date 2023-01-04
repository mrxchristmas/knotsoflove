import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signup, response } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    signup(email, password)
  }
  
  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button>sign up</button>
        {response.error && <p>{response.error}</p>}
      </form>
    </div>
  )
}
