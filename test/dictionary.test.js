const { loadWords, search, lookup } = require('../src/dictionary');

const words = loadWords();

describe('dictionary', () => {
  test('словник не порожній і відсортований за алфавітом', () => {
    expect(words.length).toBeGreaterThan(10);
    const names = words.map((w) => w.word);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('порожній запит повертає весь словник', () => {
    expect(search(words, '')).toHaveLength(words.length);
  });

  test('пошук за англійським словом без урахування регістру', () => {
    const result = search(words, 'CACHE');
    expect(result[0].word).toBe('cache');
  });

  test('пошук за українським перекладом', () => {
    const result = search(words, 'кеш');
    expect(result.map((w) => w.word)).toContain('cache');
  });

  test('збіги з початку слова йдуть раніше за збіги всередині', () => {
    const result = search(words, 'test');
    expect(result[0].word).toBe('test');
  });

  test('невідомий запит повертає порожній масив', () => {
    expect(search(words, 'zzzzzz')).toEqual([]);
  });

  test('lookup знаходить точне слово і повертає null для невідомого', () => {
    expect(lookup(words, 'Pipeline').translation).toBe('пайплайн');
    expect(lookup(words, 'nothing')).toBeNull();
  });
});
