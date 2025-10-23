import React, { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Consumir backend directamente (cuando se sirva desde docker network)
    const apiBase = process.env.REACT_APP_API_URL || 'http://backend_bautista:5000';
    fetch(`${apiBase}/items`)
      .then(r => r.json())
      .then(setItems)
      .catch(console.error);

    fetch(`${apiBase}/bautista`)
      .then(r => r.json())
      .then(data => setFullName(data.fullName))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Proyecto Docker Compose - Microservicios</h1>
      <h2>Alumno: Hannia Paola De Los Santos Bautista</h2>
      <h3>Endpoint /bautista respondió:</h3>
      <pre>{fullName}</pre>

      <h3>Items desde la API</h3>
      <ul>
        {items.map(it => (
          <li key={it.id}>
            <strong>{it.name}</strong>: {it.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
