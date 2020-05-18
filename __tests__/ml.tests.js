const request = require('supertest');

const app = require('../app');

test('Deve responder na raiz', () => {
  return request(app).get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Deve conter paramentro Search válidos', () => {
  return request(app).post('/search')
    .send({limit:10})
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Search é obrigatório e precisa ser alfanumérico');
    });
});
test('Deve conter paramentro Limit válidos', () => {
  return request(app).post('/search')
    .send({search:'cadeado'})
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Limit é obrigatório e precisa ser inteiro');
    });
});
test('Deve conter resultados validos', () => {
  return request(app).post('/search')
    .send({search:'cadeado', limit:'a'})
    .then((res) => {
      expect(res.status).toBe(400);
    });
});