const express = require('express');
const path = require('path');
const app = express();

// Servir los archivos estáticos de build
app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/proxy/items', async (req, res) => {
  const apiUrl = (process.env.REACT_APP_API_URL || 'http://backend_bautista:5000') + '/items';
  try {
    const fetch = await import('node-fetch').then(m => m.default);
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error proxy hacia backend' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend sirviendo en puerto ${PORT}`));