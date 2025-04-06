import React, { useState } from 'react';

function AddBook({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [editorial, setEditorial] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return;
    onAdd({ title, author, year, editorial, genre, language });
    setTitle('');
    setAuthor('');
    setYear('');
    setEditorial('');
    setGenre('');
    setLanguage('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Información general</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Año de publicación"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
          <input
          type="text"
          placeholder="Editorial"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
        />
          <input
          type="text"
          placeholder="Género o tema"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
          <input
          type="text"
          placeholder="Idioma original"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

/>

        
/>

      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>Añadir libro</button>
    </form>
  );
  
}

export default AddBook;
