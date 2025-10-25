const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://backend_bautista:5000';

// Proxy GET /bautista
app.get('/api/proxy/bautista', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(`${BACKEND_URL}/bautista`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error proxy GET /bautista:', err);
    res.status(500).json({ error: 'Error proxy GET /bautista' });
  }
});

// Proxy GET /items
app.get('/api/proxy/items', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(`${BACKEND_URL}/items`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error proxy GET /items:', err);
    res.status(500).json({ error: 'Error proxy GET /items' });
  }
});

// Proxy POST /items
app.post('/api/proxy/items', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(`${BACKEND_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Error proxy POST /items:', err);
    res.status(500).json({ error: 'Error proxy POST /items' });
  }
});

// Proxy PUT /items/:id
app.put('/api/proxy/items/:id', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(`${BACKEND_URL}/items/${req.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Error proxy PUT /items:', err);
    res.status(500).json({ error: 'Error proxy PUT /items' });
  }
});

// Proxy DELETE /items/:id
app.delete('/api/proxy/items/:id', async (req, res) => {
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(`${BACKEND_URL}/items/${req.params.id}`, {
      method: 'DELETE'
    });
    res.status(response.status).send();
  } catch (err) {
    console.error('Error proxy DELETE /items:', err);
    res.status(500).json({ error: 'Error proxy DELETE /items' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;