import { useState } from 'react'

import { useAuthContext } from "../hooks/useAuthContext"
import { useFirestore } from '../hooks/useFirestore'



export default function BookForm() {
  const { user } = useAuthContext()

  const [newBook, setNewBook] = useState('')
  
  const { response, addDocument } = useFirestore('books')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addDocument({title: newBook, uid: user.uid})
    console.log(response);

    setNewBook('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input 
          required
          type="text"
          onChange={(e) => setNewBook(e.target.value)}
          value={newBook}
        />
      </label>
      <button>Add</button>
    </form>
  )
}
