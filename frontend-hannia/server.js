const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/proxy/items', async (req, res) => {
  // Proxy simple hacia el backend por nombre de servicio en la red de compose
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

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend estático en puerto ${PORT}`));
