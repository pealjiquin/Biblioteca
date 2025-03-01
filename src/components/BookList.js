import React, { useState } from 'react';
import AddBook from './AddBook';
import SearchByISBN from './SearchByISBN';
import QRScanner from './QRScanner';


function BookList() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'El nombre del viento', author: 'Patrick Rothfuss' }
  ]);

  const addBook = (book) => {
    setBooks([...books, { id: books.length + 1, ...book }]);
  };

  return (
    <div>
      <h1>Lista de Libros</h1>
      <AddBook onAdd={addBook} />
      <SearchByISBN onAddBook={addBook} />
      <QRScanner onAddBook={addBook} />
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;

