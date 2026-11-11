// Проста збірка: збирає застосунок у каталог dist/ (кросплатформно, без bash).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const pkg = require('../package.json');
const words = require('../data/words.json');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const dir of ['src', 'public', 'data']) {
  fs.cpSync(path.join(root, dir), path.join(dist, dir), { recursive: true });
}
fs.copyFileSync(path.join(root, 'package.json'), path.join(dist, 'package.json'));

fs.writeFileSync(
  path.join(dist, 'build-info.json'),
  JSON.stringify({ name: pkg.name, version: pkg.version, words: words.length, builtAt: new Date().toISOString() }, null, 2)
);

console.log(`Збірку завершено: ${dist}`);
