const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL usando variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db_bautista',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || 'hannia_user',
  password: process.env.DB_PASSWORD || 'hannia',
  database: process.env.DB_NAME || 'hannia_bautista_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Endpoint con tu apellido que retorna tu nombre completo
app.get('/bautista', (req, res) => {
  res.json({ fullName: "Hannia Paola De Los Santos Bautista" });
});

// CRUD simple para items

// GET all items
app.get('/items', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error leyendo items' });
  }
});

// POST new item
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO items (name, description) VALUES (?, ?)',
      [name, description]
    );
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error insertando item' });
  }
});

// DELETE item by id
app.delete('/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM items WHERE id = ?', [id]);
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
