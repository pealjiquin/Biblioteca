import React, { useState } from 'react';

function AddBook({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    onAdd({ title, author });
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Añadir Nuevo Libro</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          placeholder="Título del libro"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor del libro"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
  
}

export default AddBook;
