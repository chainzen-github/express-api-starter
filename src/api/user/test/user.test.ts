import { Users } from '../model';
import request from 'supertest';
import app from '../../express-app';


beforeAll(async () => {
  try {
    // await Users.drop();
  } catch (error) {
    throw new Error('ERROR CONNECTION TO DB');
  }
});



describe('POST /api/v1/user', () => {
  it('responds with an error if the user data is invalid', async () =>
    request(app)
      .post('/api/v1/user')
      .set('Accept', 'application/json')
      .send({
        username: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }),
  );
  it('should be able to store user data in database', async () =>{
    request(app)
      .post('/api/v1/user')
      .set('Accept', 'application/json')
      .send({
        username: 'hello',
        email: 'allo@gmail.com',
        passowrd: 'dscwe',
        discord: 'dsdsd',
        confirmation: 12345,
      }).expect(201).
      then((res) =>{
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('discord');
        expect(res.body).toHaveProperty('confirmation');
      });
  });
});