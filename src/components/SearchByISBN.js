import React, { useState } from 'react';

function SearchByISBN({ onAddBook }) {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!isbn) {
      setError('Por favor, ingrese un ISBN válido.');
      return;
    }

    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const data = await response.json();

      if (data[`ISBN:${isbn}`]) {
        const bookData = data[`ISBN:${isbn}`];
        setBook({
          title: bookData.title,
          author: bookData.authors ? bookData.authors[0].name : 'Autor desconocido'
        });
        setError('');
      } else {
        setBook(null);
        setError('Libro no encontrado.');
      }
    } catch (e) {
      setBook(null);
      setError('Error al buscar el libro.');
    }
  };

  const handleAddBook = () => {
    if (book && onAddBook) {
      onAddBook(book);
      setBook(null);
      setIsbn('');
    }
  };

  return (
    <div>
      <h2>Buscar Libro por ISBN</h2>
      <input
        type="text"
        placeholder="Ingrese ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>Autor: {book.author}</p>
          <button onClick={handleAddBook}>Añadir a la lista</button>
        </div>
      )}
    </div>
  );
}

export default SearchByISBN;

