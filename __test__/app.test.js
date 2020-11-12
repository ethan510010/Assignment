const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

test('test request amount and limit', async (done) => {
  for (let i = 0; i < 61; i++) {
    const res = await request.get('/');
    if (i > 60) {
      expect(res.status).toBe(429);
    } else if (res.status === 200) {
      if (res.status === 200) {
        expect(res.body).toBe(i + 1);
      }
    }
  }
  done();
});
