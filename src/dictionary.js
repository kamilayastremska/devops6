const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, '..', 'data', 'words.json');

function loadWords(file = DATA_FILE) {
  const raw = fs.readFileSync(file, 'utf8');
  return JSON.parse(raw).sort((a, b) => a.word.localeCompare(b.word));
}

const normalize = (s) => String(s || '').trim().toLowerCase();

/**
 * Пошук за англійським словом або українським перекладом.
 * Спочатку йдуть збіги з початку слова, потім — збіги всередині.
 * Порожній запит повертає весь словник.
 */
function search(words, query) {
  const q = normalize(query);
  if (!q) return words;

  const starts = [];
  const contains = [];
  for (const entry of words) {
    const w = normalize(entry.word);
    const t = normalize(entry.translation);
    if (w.startsWith(q) || t.startsWith(q)) starts.push(entry);
    else if (w.includes(q) || t.includes(q)) contains.push(entry);
  }
  return [...starts, ...contains];
}

function lookup(words, word) {
  const w = normalize(word);
  return words.find((entry) => normalize(entry.word) === w) || null;
}

module.exports = { loadWords, search, lookup };
