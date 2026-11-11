const request = require('supertest');
const { createApp } = require('../src/app');

const app = createApp();

describe('HTTP API', () => {
  test('GET /api/health повертає статус ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/words?q=cache знаходить слово', async () => {
    const res = await request(app).get('/api/words').query({ q: 'cache' });
    expect(res.status).toBe(200);
    expect(res.body[0].word).toBe('cache');
  });

  test('GET /api/words/:word повертає статтю', async () => {
    const res = await request(app).get('/api/words/commit');
    expect(res.status).toBe(200);
    expect(res.body.translation).toBe('коміт');
  });

  test('GET /api/words/:word для невідомого слова дає 404', async () => {
    const res = await request(app).get('/api/words/unknown-word');
    expect(res.status).toBe(404);
  });

  test('головна сторінка віддає веб-інтерфейс', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Словник IT-термінів');
  });
});
