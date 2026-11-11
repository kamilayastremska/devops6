// jgjg



const path = require('path');
const express = require('express');
const { loadWords, search, lookup } = require('./dictionary');

function createApp(words = loadWords()) {
  const app = express();

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', words: words.length });
  });

  app.get('/api/words', (req, res) => {
    res.json(search(words, req.query.q));
  });

  app.get('/api/words/:word', (req, res) => {
    const entry = lookup(words, req.params.word);
    if (!entry) {
      return res.status(404).json({ error: 'Слово не знайдено' });
    }
    res.json(entry);
  });

  return app;
}

module.exports = { createApp };
