const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/editorDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ✅ Create Schema
const contentSchema = new mongoose.Schema({
  html: {
    type: String,
    required: true
  }
});

// ✅ Create Model
const Content = mongoose.model('Content', contentSchema);

// Article Schema & Model
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  html: { type: String, default: '' }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);


// =======================
// GET content
// =======================
app.get('/api/content', async (req, res) => {
  try {
    const content = await Content.findOne();

    if (!content) {
      return res.json({ html: '' });
    }

    res.json({ html: content.html });

  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


// =======================
// SAVE content
// =======================
app.post('/api/content', async (req, res) => {
  try {
    const { html } = req.body;

    let content = await Content.findOne();

    if (content) {
      content.html = html;
      await content.save();
    } else {
      await Content.create({ html });
    }

    res.json({ ok: true });

  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


// =======================
// Articles CRUD
// =======================

// List all articles
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get single article
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create article
app.post('/api/articles', async (req, res) => {
  try {
    const { title, html } = req.body;
    const created = await Article.create({ title: title || 'Untitled', html: html || '' });
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Update article
app.put('/api/articles/:id', async (req, res) => {
  try {
    const { title, html } = req.body;
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      { title, html },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete article
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});

const userSchema = new mongoose.Schema(
  { email: { 
    type: String,
    index: true 
  },
   username: String 
  });