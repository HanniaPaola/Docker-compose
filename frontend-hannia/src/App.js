import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [fullName, setFullName] = useState('');
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [editingItem, setEditingItem] = useState(null);

  const apiBase = '/api/proxy'; // ✅ Ahora usa el proxy

  // Cargar items
  const loadItems = async () => {
    try {
      const res = await fetch(`${apiBase}/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error cargando items:', err);
    }
  };

  useEffect(() => {
    loadItems();
    fetch(`${apiBase}/bautista`)
      .then(r => r.json())
      .then(data => setFullName(data.fullName))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        await fetch(`${apiBase}/items/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });
      } else {
        await fetch(`${apiBase}/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });
      }

      setNewItem({ name: '', description: '' });
      setEditingItem(null);
      loadItems();
    } catch (err) {
      console.error('Error en submit:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este item?')) {
      try {
        await fetch(`${apiBase}/items/${id}`, { method: 'DELETE' });
        loadItems();
      } catch (err) {
        console.error('Error eliminando:', err);
      }
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Proyecto Docker Compose - Microservicios</h1>
        <h2>Alumno: Hannia Paola De Los Santos Bautista</h2>
        <h3>Endpoint /bautista respondió:</h3>
        <h2>Alumno: {fullName}</h2>
      </header>

      <section className="form-section">
        <h3>{editingItem ? 'Editar Item' : 'Agregar Nuevo Item'}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newItem.description}
            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
            required
          />
          <button type="submit">
            {editingItem ? 'Actualizar' : 'Agregar'}
          </button>
          {editingItem && (
            <button type="button" className="cancel" onClick={() => {
              setEditingItem(null);
              setNewItem({ name: '', description: '' });
            }}>
              Cancelar
            </button>
          )}
        </form>
      </section>

      <section className="list-section">
        <h3>Lista de Items</h3>
        <div className="card-grid">
          {items.map(it => (
            <div className="card" key={it.id}>
              <h4>{it.name}</h4>
              <p>{it.description}</p>
              <div className="card-buttons">
                <button onClick={() => handleEdit(it)}>✏️ Editar</button>
                <button onClick={() => handleDelete(it.id)}>🗑️ Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;