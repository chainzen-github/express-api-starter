import request from 'supertest';
import app from '../../express-app';
import { Users } from '../model';


beforeAll(async () => {
  try {
    await Users.drop();
  } catch (error) {
    throw new Error('ERROR CONNECTION TO DB');
  }
});




// Posting data to database by registering a new user
describe('POST /api/v1/user', () => {
  it('responds with an error if the user data is invalid', async () =>{
    await request(app)
      .post('/api/v1/user')
      .set('Accept', 'application/json')
      .send({
        username: '',
      })
      .expect(422);
  });
  it('should be able to store user data in database', async () =>{
    await request(app)
      .post('/api/v1/user')
      .set('Accept', 'application/json')
      .send({
        email: 'allo@gmail.com',
        username: 'hello',
        password: 'dscwe',
        discord: 'dsdsd',
        confirmation: 123456,
      }).expect(201).
      then((res) =>{
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('discord');
        expect(res.body).toHaveProperty('confirmation');
        expect(res.body.username).toBe('hello');
        expect(res.body.email).toBe('allo@gmail.com');
        expect(res.body.password).toBe('dscwe');
        expect(res.body.discord).toBe('dsdsd');
        expect(res.body.confirmation).toBe(123456);
      });
  });
});



// Testing the GET route
describe('GET /api/v1/user', () =>{
  it('should return all created users', async () => {
    await request(app)
      .get('/api/v1/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body[0]).toHaveProperty('username');
        expect(res.body[0]).toHaveProperty('email');
        expect(res.body[0]).toHaveProperty('password');
        expect(res.body[0]).toHaveProperty('discord');
        expect(res.body[0]).toHaveProperty('confirmation');
        expect(res.body[0].username).toBe('hello');
        expect(res.body[0].email).toBe('allo@gmail.com');
        expect(res.body[0].password).toBe('dscwe');
        expect(res.body[0].discord).toBe('dsdsd');
        expect(res.body[0].confirmation).toBe(123456);
      });
    
  } );
});

// Testing the login 

describe('GET /api/v1/user', () =>{
  it('should return invalid login or password', async () =>{
    await request(app).get('/api/v1/user/ssdds/sdss')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  });
  it('should return the current user when typing right credential', async () => {
    await request(app).get('/api/v1/user/hello/dscwe')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res =>{
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('password');
        expect(res.body).toHaveProperty('discord');
        expect(res.body).toHaveProperty('confirmation');
        expect(res.body.username).toBe('hello');
        expect(res.body.email).toBe('allo@gmail.com');
        expect(res.body.password).toBe('dscwe');
        expect(res.body.discord).toBe('dsdsd');
        expect(res.body.confirmation).toBe(123456);
      });
    
  });

});