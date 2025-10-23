const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Variables de entorno para conexión (vienen desde docker-compose)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'hannia_user',
  password: process.env.DB_PASSWORD || 'HanniaStrongP@ssw0rd',
  database: process.env.DB_NAME || 'hannia_bautista_db'
});

// Endpoint con tu apellido que retorna tu nombre completo
app.get('/bautista', (req, res) => {
  res.json({ fullName: "Hannia Paola De Los Santos Bautista" });
});

// CRUD simple para items
app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error leyendo items' });
  }
});

app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error insertando item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error eliminando item' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en puerto ${PORT}`);
});
