import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookList() {
  const [books, setBooks] = useState(() => {
    const storedBooks = localStorage.getItem('myLibraryBooks');
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({
    titulo: '',
    subtitulo: '',
    nombreAutor: '',
    apellidoAutor: '',
    anio: '',
    numeroPaginas: '',
    isbn: '',
    idioma: '',
    idiomasDisponibles: '',
    editorial: '',
    sello: '',
    coleccion: '',
    genero: '',
    signatura: '',
    ubicacion: '',
    formato: '',
    estado: '',
    fechaAdquisicion: '',
    procedencia: '',
    etiquetas: '',
    notas: '',
    indice: ''
  });

  const [isbnSearch, setIsbnSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('myLibraryBooks', JSON.stringify(books));
  }, [books]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleIsbnChange = (e) => {
    setIsbnSearch(e.target.value);
  };

  const fetchBookByIsbn = async () => {
    if (isbnSearch.trim() !== '') {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnSearch}`);
        
        // Verificamos si la API devolvió algún resultado
        if (response.data.items) {
          const bookData = response.data.items[0].volumeInfo;
          setNewBook({
            ...newBook,
            titulo: bookData.title,
            subtitulo: bookData.subtitle || '',
            nombreAutor: bookData.authors?.[0] || '',
            anio: bookData.publishedDate || '',
            numeroPaginas: bookData.pageCount || '',
            isbn: isbnSearch,
            idioma: bookData.language || '',
            idiomasDisponibles: '', // Puedes extenderlo con idiomas disponibles
            editorial: bookData.publisher || '',
            sello: '',
            coleccion: '',
            genero: '',
            signatura: '',
            ubicacion: '',
            formato: '',
            estado: '',
            fechaAdquisicion: '',
            procedencia: '',
            etiquetas: '',
            notas: '',
            indice: ''
          });
          setErrorMessage(''); // Limpiar el mensaje de error si se encuentra el libro
        } else {
          setErrorMessage('Libro no encontrado en la base de datos.');
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
        setErrorMessage("Hubo un problema al intentar buscar el libro. Verifique el ISBN.");
      }
    }
  };

  const addBook = () => {
    const bookToAdd = {
      ...newBook,
      id: books.length + 1,
      idiomasDisponibles: newBook.idiomasDisponibles.split(',').map((lang) => lang.trim()),
      etiquetas: newBook.etiquetas.split(',').map((tag) => tag.trim())
    };
    setBooks([...books, bookToAdd]);
    setNewBook({
      titulo: '', subtitulo: '', nombreAutor: '', apellidoAutor: '', anio: '', numeroPaginas: '', isbn: '',
      idioma: '', idiomasDisponibles: '', editorial: '', sello: '', coleccion: '', genero: '', signatura: '', 
      ubicacion: '', formato: '', estado: '', fechaAdquisicion: '', procedencia: '', etiquetas: '', notas: '', indice: ''
    });
    setShowForm(false);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Lista de Libros</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cerrar formulario' : '➕ Añadir nuevo libro'}
      </button>

      <div>
        <h2>Buscar por ISBN</h2>
        <input
          type="text"
          placeholder="Introduce el ISBN"
          value={isbnSearch}
          onChange={handleIsbnChange}
          style={{
            marginBottom: '1rem',
            padding: '0.4rem',
            width: '300px',  // Ajustado para hacerlo más estrecho
            marginTop: '1rem',
            display: 'block', 
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        />
        <button onClick={fetchBookByIsbn} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>Buscar</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Mostrar mensaje de error si no se encuentra el libro */}
      </div>

      {showForm && (
        <div style={{ marginTop: '1rem', textAlign: 'left', maxWidth: '700px', margin: '2rem auto', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <h2>Formulario de nuevo libro</h2>
          {Object.entries(newBook).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.25rem' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '1rem' }}
              />
            </div>
          ))}
          <button onClick={addBook} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>✅ Guardar libro</button>
        </div>
      )}

      <ul className="book-list" style={{ marginTop: '2rem' }}>
        {books.map((book) => (
          <li key={book.id} style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <strong>{book.titulo}</strong>
            {book.subtitulo && `: ${book.subtitulo}`} <br />
            <u><strong>Información general</strong></u><br />
            Autor: {book.apellidoAutor}, {book.nombreAutor}<br />
            Año: {book.anio} | Páginas: {book.numeroPaginas} | Idioma original: {book.idioma} | Otros idiomas: {book.idiomasDisponibles?.join(', ') || 'N/A'}<br />
            <u><strong>Datos editoriales</strong></u><br />
            Editorial: {book.editorial} | Sello: {book.sello} | Colección: {book.coleccion}<br />
            Género: {book.genero} | Signatura: {book.signatura} | Ubicación: {book.ubicacion}<br />
            <u><strong>Formato y estado</strong></u><br />
            Formato: {book.formato} | Estado: {book.estado}<br />
            Fecha adquisición: {book.fechaAdquisicion} | Procedencia: {book.procedencia}<br />
            <u><strong>Observaciones</strong></u><br />
            Etiquetas: {book.etiquetas?.join(', ') || 'Ninguna'}<br />
            Notas: {book.notas}<br />
            Índice: {book.indice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
