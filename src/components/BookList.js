import { useFirestore } from "../hooks/useFirestore"

export default function BookList({ books }) {

  const { deleteDocument, response } = useFirestore('books')

  const handleClick = async (id) => {
    await deleteDocument(id)
    console.log(response)
  }

  return (
    <div className="book-list">
      <ul>
        {books.map(book => (
          <li key={book.id} onClick={() => handleClick(book.id)}>{book.title}</li>
        ))}
      </ul>
    </div>
  )
}