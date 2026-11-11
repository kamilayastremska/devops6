# dictionary-ci

Онлайн-словник IT-термінів (EN → UK) на Node.js + Express з мінімальним веб-інтерфейсом.

```bash
npm install
npm start        # http://localhost:3000
npm test
npm run build    # результат у dist/
```

API: `GET /api/words?q=...`, `GET /api/words/:word`, `GET /api/health`.
