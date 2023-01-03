import request from 'supertest';
import app  from '../../express-app';

describe('DELETE /api/v1/todos/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/todos/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/todos/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/todos/${process.env.id}`)
      .expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/todos/${process.env.id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});