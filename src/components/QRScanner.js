import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner({ onAddBook }) {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');

  // Forzar el permiso para la cámara al cargar el componente
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log("Cámara permitida");
      })
      .catch((err) => {
        console.error("Permiso denegado", err);
      });
  }, []);

  const handleScan = (data) => {
    if (data) {
      try {
        const book = JSON.parse(data.text);
        if (book.title && book.author) {
          onAddBook(book);
          setScanResult(`Libro agregado: ${book.title} - ${book.author}`);
          setError('');
        } else {
          setError('El código QR no contiene la información correcta.');
        }
      } catch (e) {
        setError('El formato del código QR no es válido.');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Error al acceder a la cámara.');
  };

  return (
    <div>
      <h2>Escanear Código QR</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result);
          if (error) handleError(error);
        }}
        style={{ width: '100%' }}
      />
      {scanResult && <p style={{ color: 'green' }}>{scanResult}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QRScanner;
