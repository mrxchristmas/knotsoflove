import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, response } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  const { socialLogin, _signInAnonymously } = useAuth()
  
  return (
    <div>
      <h2>Login</h2>
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
        <button>log in</button>
        {response.error && <p>{response.error}</p>}
      </form>
      <br /><br />
      <button onClick={() => socialLogin('google.com')}>log in with google</button>
      
      <br /><br />
      <button onClick={() => _signInAnonymously()}>log in anonymously</button>
    </div>
  )
}

