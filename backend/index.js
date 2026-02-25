const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let storedHtml = '';

app.get('/api/content', (req, res) => {
  res.json({ html: storedHtml });
});

app.post('/api/content', (req, res) => {
  storedHtml = req.body.html || '';
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

